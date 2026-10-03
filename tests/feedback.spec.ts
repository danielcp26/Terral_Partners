import { test, expect } from "@playwright/test";
// Isolated test server; all POSTs are intercepted. No business data is transmitted.
test("configured form shows loading, preserves data after failure and confirms only acceptance", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:3001/en/inquiry/buyer");
  await page.locator("#name").fill("Test Contact");
  await page.locator("#company").fill("Test Company");
  await page.locator("#email").fill("test@example.com");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.locator("#location").fill("Guanacaste");
  await page.locator("#category").selectOption("hvac");
  await page.locator("#quantity").fill("12");
  await page.locator("#timeline").selectOption("soon");
  await page.locator("#consent").check();
  let attempt = 0;
  const keys: string[] = [];
  await page.route("**/api/inquiries", async (route) => {
    attempt++;
    keys.push(route.request().postDataJSON().idempotencyKey);
    await new Promise((resolve) => setTimeout(resolve, 250));
    await route.fulfill({
      status: attempt === 1 ? 502 : 201,
      contentType: "application/json",
      body: JSON.stringify(
        attempt === 1
          ? { accepted: false }
          : { accepted: true, reference: "TEST-RECEIPT" },
      ),
    });
  });
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.getByRole("button", { name: "Sending…" })).toBeDisabled();
  await expect(page.locator(".form-message")).toContainText(
    "couldn’t confirm receipt",
  );
  await expect(page.locator("#quantity")).toHaveValue("12");
  await expect(page.locator("#success-heading")).not.toBeVisible();
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.locator("#success-heading")).toHaveText(
    "Your inquiry was received.",
  );
  await expect(page.locator("#success-heading")).toBeFocused();
  await expect(page.getByText("TEST-RECEIPT", { exact: true })).toBeVisible();
  expect(keys[0]).toBe(keys[1]);
});
