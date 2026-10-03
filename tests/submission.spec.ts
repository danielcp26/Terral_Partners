import { test, expect } from "@playwright/test";
import { POST } from "../src/app/api/inquiries/route";
import { emptyValues } from "../src/lib/inquiry";
test("server validates, refuses unconfigured delivery, and requires durable acknowledgement", async () => {
  const env = {
    url: process.env.INQUIRY_WEBHOOK_URL,
    token: process.env.INQUIRY_WEBHOOK_TOKEN,
    legal: process.env.LEGAL_APPROVED,
  };
  const originalFetch = globalThis.fetch;
  let index = 0;
  const payload = {
    type: "buyer",
    locale: "es",
    idempotencyKey: crypto.randomUUID(),
    values: {
      ...emptyValues,
      name: "Test Contact",
      company: "Test Co",
      email: "test@example.com",
      location: "Guanacaste",
      category: "hvac",
      quantity: "12",
      timeline: "soon",
      consent: true,
    },
  };
  function request(data: unknown = payload, origin = "http://localhost:3000") {
    return new Request("http://localhost:3000/api/inquiries", {
      method: "POST",
      headers: {
        origin,
        "Content-Type": "application/json",
        "x-forwarded-for": `192.0.2.${++index}`,
      },
      body: JSON.stringify(data),
    });
  }
  try {
    delete process.env.INQUIRY_WEBHOOK_URL;
    delete process.env.INQUIRY_WEBHOOK_TOKEN;
    delete process.env.LEGAL_APPROVED;
    expect((await POST(request())).status).toBe(503);
    expect(
      (
        await POST(
          request({ ...payload, values: { ...payload.values, email: "bad" } }),
        )
      ).status,
    ).toBe(422);
    expect((await POST(request(payload, "https://other.example"))).status).toBe(
      403,
    );
    expect(
      (
        await POST(
          request({ ...payload, values: { ...payload.values, honey: "bot" } }),
        )
      ).status,
    ).toBe(422);
    expect((await POST(request({ oversized: "x".repeat(25000) }))).status).toBe(
      413,
    );
    process.env.INQUIRY_WEBHOOK_URL = "https://receiver.example.test/inquiries";
    process.env.INQUIRY_WEBHOOK_TOKEN = "test-only-secret";
    process.env.LEGAL_APPROVED = "true";
    globalThis.fetch = async () =>
      new Response(JSON.stringify({ ok: true }), { status: 200 });
    expect((await POST(request())).status).toBe(502);
    globalThis.fetch = async () => new Response("failure", { status: 500 });
    expect((await POST(request())).status).toBe(502);
    globalThis.fetch = async (_url, options) => {
      expect(new Headers(options?.headers).get("Authorization")).toBe(
        "Bearer test-only-secret",
      );
      expect(new Headers(options?.headers).get("Idempotency-Key")).toBe(
        payload.idempotencyKey,
      );
      const body = JSON.parse(String(options?.body));
      expect(body.details.honey).toBeUndefined();
      expect(body.details.email).toBe("test@example.com");
      return new Response(
        JSON.stringify({ accepted: true, reference: "TEST-RECEIPT" }),
        { status: 201 },
      );
    };
    const accepted = await POST(request());
    expect(accepted.status).toBe(201);
    expect(await accepted.json()).toEqual({
      accepted: true,
      reference: "TEST-RECEIPT",
    });
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries({
      INQUIRY_WEBHOOK_URL: env.url,
      INQUIRY_WEBHOOK_TOKEN: env.token,
      LEGAL_APPROVED: env.legal,
    })) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
