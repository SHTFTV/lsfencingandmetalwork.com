import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("/gallery accessibility", () => {
  test("gallery grid has no serious/critical axe violations", async ({ page }) => {
    await page.goto("/gallery");
    // Wait for tiles to render
    await expect(page.locator('button[aria-label^="View "]').first()).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const blocking = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    if (blocking.length > 0) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(blocking, null, 2));
    }
    expect(blocking, "critical/serious axe violations on /gallery").toEqual([]);
  });

  test("every gallery tile img has a non-empty descriptive alt", async ({ page }) => {
    await page.goto("/gallery");
    const tiles = page.locator('button[aria-label^="View "]');
    const count = await tiles.count();
    expect(count).toBeGreaterThanOrEqual(15);

    for (let i = 0; i < count; i++) {
      const img = tiles.nth(i).locator("img");
      const alt = await img.getAttribute("alt");
      expect(alt, `tile #${i} img has null alt`).not.toBeNull();
      expect((alt ?? "").trim().length, `tile #${i} alt too short`).toBeGreaterThan(15);
    }
  });

  test("open lightbox has no serious/critical axe violations", async ({ page }) => {
    await page.goto("/gallery");
    const tile = page.locator('button[aria-label^="View "]').first();
    await tile.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    const results = await new AxeBuilder({ page })
      .include('[role="dialog"]')
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const blocking = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    if (blocking.length > 0) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(blocking, null, 2));
    }
    expect(blocking, "critical/serious axe violations in open lightbox").toEqual([]);
  });
});
