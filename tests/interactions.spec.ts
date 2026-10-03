import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const locale of ["es", "en"])
  test(`${locale} category and process explorers support keyboard and relevant inquiry links`, async ({
    page,
  }) => {
    await page.goto(`/${locale}`);
    const categories = page.locator(".category-tabs").getByRole("tab");
    await categories.nth(1).click();
    await expect(categories.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(page.locator(".category-detail-copy h3")).toContainText(
      locale === "es" ? "Mobiliario" : "Furniture",
    );
    await expect(page.locator(".category-detail-copy a")).toHaveAttribute(
      "href",
      `/${locale}/inquiry/buyer?category=furniture`,
    );
    await categories.nth(1).press("ArrowRight");
    await expect(categories.nth(2)).toBeFocused();
    await expect(categories.nth(2)).toHaveAttribute("aria-selected", "true");
    await categories.nth(2).press("Home");
    await expect(categories.nth(0)).toBeFocused();
    const steps = page.locator(".process-selectors").getByRole("tab");
    await steps.nth(0).click();
    await steps.nth(0).press("ArrowDown");
    await expect(steps.nth(1)).toBeFocused();
    await expect(steps.nth(1)).toHaveAttribute("aria-selected", "true");
    await page.locator(".process-next").click();
    await expect(steps.nth(2)).toHaveAttribute("aria-selected", "true");
    await page.locator(".process-next").click();
    await expect(steps.nth(3)).toHaveAttribute("aria-selected", "true");
    await expect(page.locator(".process-controls a")).toHaveAttribute(
      "href",
      `/${locale}/inquiry/buyer`,
    );
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(page.locator(".process-detail > div").nth(1)).toHaveCSS(
      "opacity",
      "1",
    );
    expect(
      (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze())
        .violations,
    ).toEqual([]);
  });
test("hero actually animates with motion enabled and remains still with reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/es");
  await expect
    .poll(() =>
      page
        .locator(".hero-photo")
        .evaluate((el) => getComputedStyle(el).transform),
    )
    .not.toBe("none");
  await expect
    .poll(
      () =>
        page
          .locator(".hero-photo")
          .evaluate((el) => getComputedStyle(el).transform),
      { timeout: 4000 },
    )
    .toBe("none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(page.locator(".hero-copy h1")).toBeVisible();
  expect(
    await page
      .locator(".hero-photo")
      .evaluate((el) => getComputedStyle(el).transform),
  ).toBe("none");
});
