import { NextResponse } from "next/server";
import { inquirySchema, validateInquiry } from "@/lib/inquiry";
export const runtime = "nodejs";
// A bounded, per-instance backstop. Configure shared edge rate limiting before public launch.
const attempts = new Map<string, { count: number; expires: number }>();
export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  const reply = (body: object, status: number) =>
    NextResponse.json(body, { status, headers });
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return reply({ accepted: false }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return reply({ accepted: false }, 415);
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  for (const [key, value] of attempts)
    if (value.expires < now) attempts.delete(key);
  if (attempts.size > 10000) return reply({ accepted: false }, 429);
  const entry = attempts.get(ip) || { count: 0, expires: now + 60000 };
  if (++entry.count > 6) return reply({ accepted: false }, 429);
  attempts.set(ip, entry);
  let raw: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply({ accepted: false }, 400);
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.length;
      if (length > 24000) {
        await reader.cancel();
        return reply({ accepted: false }, 413);
      }
      chunks.push(value);
    }
    raw = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return reply({ accepted: false }, 400);
  }
  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) return reply({ accepted: false }, 400);
  const { values, type, locale, idempotencyKey } = parsed.data;
  if (values.honey) return reply({ accepted: false }, 422);
  const errors = validateInquiry(values, type, locale);
  if (Object.keys(errors).length)
    return reply({ accepted: false, errors }, 422);
  const endpoint = process.env.INQUIRY_WEBHOOK_URL;
  const token = process.env.INQUIRY_WEBHOOK_TOKEN;
  if (!endpoint || !token || process.env.LEGAL_APPROVED !== "true")
    return reply({ accepted: false }, 503);
  try {
    const url = new URL(endpoint);
    if (
      url.protocol !== "https:" &&
      !(
        process.env.NODE_ENV !== "production" &&
        ["localhost", "127.0.0.1"].includes(url.hostname)
      )
    )
      return reply({ accepted: false }, 503);
    const { honey: _honey, ...details } = values;
    void _honey;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        type,
        locale,
        details,
        privacyVersion: "draft-2026-10-03",
        receivedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(12000),
      redirect: "error",
    });
    if (!response.ok) return reply({ accepted: false }, 502);
    const ack = await response.json();
    // HTTP 2xx alone is not proof of durable acceptance: require the documented acknowledgement.
    if (
      ack.accepted !== true ||
      typeof ack.reference !== "string" ||
      !/^[a-zA-Z0-9_-]{1,80}$/.test(ack.reference)
    )
      return reply({ accepted: false }, 502);
    return reply({ accepted: true, reference: ack.reference }, 201);
  } catch {
    return reply({ accepted: false }, 502);
  }
}
