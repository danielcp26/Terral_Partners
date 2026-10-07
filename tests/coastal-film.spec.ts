import { test, expect } from "@playwright/test";

test("coastal film plays, pauses on request, and stays paused after scrolling", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/es");
  const film = page.locator("video");
  await expect
    .poll(() =>
      film.evaluate((v: HTMLVideoElement) => !v.paused && v.currentTime > 0),
    )
    .toBe(true);
  await page.getByRole("button", { name: "Pausar animación" }).click();
  await expect
    .poll(() => film.evaluate((v: HTMLVideoElement) => v.paused))
    .toBe(true);
  await page.locator("#categories").scrollIntoViewIfNeeded();
  await page.locator(".hero").scrollIntoViewIfNeeded();
  expect(await film.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  await page.getByRole("button", { name: "Reproducir animación" }).click();
  await expect
    .poll(() => film.evaluate((v: HTMLVideoElement) => v.paused))
    .toBe(false);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(film).not.toBeVisible();
  await expect
    .poll(() => film.evaluate((v: HTMLVideoElement) => v.paused))
    .toBe(true);
});

test("reduced motion does not download the film and preserves the hero", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (request) => {
    if (request.url().endsWith(".mp4")) requests.push(request.url());
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  await expect(page.locator(".hero h1")).toBeVisible();
  await expect(page.locator(".coastal-film")).not.toHaveAttribute("src");
  await expect(page.locator(".film-control")).toHaveCount(0);
  expect(requests).toEqual([]);
});

test("failed video keeps a usable still-image hero", async ({ page }) => {
  await page.route("**/videos/terral-coast.mp4", (route) => route.abort());
  await page.goto("/es");
  await expect(page.locator(".film-control")).toHaveCount(0);
  await expect(page.locator(".hero-photo")).toBeVisible();
  await expect(page.locator(".hero-buttons a").first()).toHaveAttribute(
    "href",
    "/es/inquiry/buyer",
  );
});
