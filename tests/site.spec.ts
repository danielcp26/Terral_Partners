import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("Spanish default, section-preserving language switch, FAQ and keyboard", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page).toHaveURL(/\/es$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await page.keyboard.press("Tab");
  await expect(
    page.getByText("Ir al contenido", { exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
  await page.goto("/es#process");
  await page.getByRole("link", { name: "Switch to English" }).click();
  await expect(page).toHaveURL(/\/en#process$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  const question = page.getByRole("button", {
    name: "Who pays Terral Partners?",
  });
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByText(/Our initial model is a supplier-funded/),
  ).toBeVisible();
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "false");
  expect(errors).toEqual([]);
});
for (const locale of ["es", "en"])
  for (const width of [375, 768, 1440])
    test(`${locale} ${width}px layout, accessibility and image loading`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(`/${locale}`);
      await page.evaluate(() => document.fonts.ready);
      for (const section of [
        "#buyers",
        "#categories",
        "#process",
        "#suppliers",
        "#about",
        "#contact",
      ])
        await page.locator(section).scrollIntoViewIfNeeded();
      await page.evaluate(() => window.scrollTo(0, 0));
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      expect(
        await page
          .locator("img")
          .evaluateAll((images) =>
            images.every(
              (i) =>
                (i as HTMLImageElement).complete &&
                (i as HTMLImageElement).naturalWidth > 0,
            ),
          ),
      ).toBe(true);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(result.violations).toEqual([]);
      await page.screenshot({
        path: `test-results/${locale}-${width}.png`,
        fullPage: true,
      });
      if (width === 375) {
        const menu = page.getByRole("button", {
          name: locale === "es" ? "Abrir menú" : "Open menu",
        });
        await menu.click();
        await expect(page.locator("#mobile-nav")).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(menu).toBeFocused();
        await expect(page.locator("#mobile-nav")).not.toBeVisible();
      }
    });
test("buyer validation, preserved back step, preselection and honest unavailable state", async ({
  page,
}) => {
  await page.goto("/es/inquiry/buyer?category=hvac");
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(page.locator("#name")).toBeFocused();
  await expect(page.locator("#email-error")).toContainText(
    "correo o un teléfono",
  );
  await page.locator("#name").fill("Test Contact");
  await page.locator("#company").fill("Test Company");
  await page.locator("#email").fill("invalid");
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(page.locator("#email-error")).toContainText("válido");
  await page.locator("#email").fill("test@example.com");
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(page.locator("#category")).toHaveValue("hvac");
  await page.locator("#location").fill("Guanacaste");
  await page.locator("#quantity").fill("12 units");
  await page.locator("#timeline").selectOption("quarter");
  await page.getByRole("button", { name: "Volver", exact: true }).click();
  await expect(page.locator("#name")).toHaveValue("Test Contact");
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(page.locator("#quantity")).toHaveValue("12 units");
  await page.getByRole("button", { name: "Enviar consulta" }).click();
  await expect(page.locator("#consent-error")).toBeVisible();
  await page.locator("#consent").check();
  await page.getByRole("button", { name: "Enviar consulta" }).click();
  await expect(page.locator(".form-message")).toContainText(
    "no está habilitada",
  );
  await expect(
    page.getByText("Su consulta fue recibida.", { exact: true }),
  ).not.toBeVisible();
  expect(
    (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze())
      .violations,
  ).toEqual([]);
});
test("supplier fields, localized metadata and legal navigation", async ({
  page,
}) => {
  await page.goto("/en/inquiry/supplier");
  await expect(page).toHaveTitle(/Become a supplier/);
  await page.locator("#name").fill("Test Supplier");
  await page.locator("#company").fill("Sample Co");
  await page.locator("#email").fill("test@example.com");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.locator("#phone-error")).toBeVisible();
  await page.locator("#phone").fill("+506 8888 8888");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.locator("#capacity")).toBeVisible();
  await expect(page.locator("#support")).toBeVisible();
  await page.locator("#website").fill("javascript:alert(1)");
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.locator("#website-error")).toContainText("full URL");
  await page.getByRole("link", { name: "Switch to English" }).click();
  await expect(page).toHaveURL(/\/en\/inquiry\/supplier/);
  for (const path of ["/en/privacy", "/en/terms", "/es/privacy", "/es/terms"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator(".legal-notice")).toBeVisible();
  }
});
test("internal links and locale-specific social images", async ({
  page,
  request,
}) => {
  await page.goto("/es");
  const hrefs = await page
    .locator("a[href]")
    .evaluateAll((nodes) => [
      ...new Set(nodes.map((n) => n.getAttribute("href")!)),
    ]);
  for (const href of hrefs) {
    const url = new URL(href, page.url());
    if (url.hash && url.pathname === "/es") {
      expect(await page.locator(`[id="${url.hash.slice(1)}"]`).count()).toBe(1);
    } else {
      const response = await request.get(url.href);
      expect(response.status()).toBeLessThan(400);
    }
  }
  for (const locale of ["es", "en"]) {
    const r = await request.get(`/${locale}/opengraph-image`);
    expect(r.status()).toBe(200);
    expect(r.headers()["content-type"]).toContain("image/png");
  }
  expect((await request.get("/fr")).status()).toBe(404);
});
