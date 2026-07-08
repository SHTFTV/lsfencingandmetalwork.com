import { test, expect } from "@playwright/test";

const TILE_SELECTOR = 'button[aria-label^="View "]';

test.describe("/gallery lightbox keyboard + focus trap", () => {
  test("opens with Enter, Escape closes and returns focus to tile", async ({ page }) => {
    await page.goto("/gallery");
    const firstTile = page.locator(TILE_SELECTOR).first();
    await firstTile.focus();
    await page.keyboard.press("Enter");

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Close button should be autofocused
    const closeBtn = dialog.getByRole("button", { name: "Close" });
    await expect(closeBtn).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(firstTile).toBeFocused();
  });

  test("arrow keys navigate between tiles", async ({ page }) => {
    await page.goto("/gallery");
    await page.locator(TILE_SELECTOR).first().click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    const counter = dialog.locator("figcaption").last();
    await expect(counter).toContainText("1 /");

    await page.keyboard.press("ArrowRight");
    await expect(counter).toContainText("2 /");

    await page.keyboard.press("ArrowLeft");
    await expect(counter).toContainText("1 /");
  });

  test("every tile opens the lightbox and Escape returns focus to that same tile", async ({ page }) => {
    await page.goto("/gallery");
    const tiles = page.locator(TILE_SELECTOR);
    const count = await tiles.count();
    expect(count).toBeGreaterThanOrEqual(15);

    for (let i = 0; i < count; i++) {
      const tile = tiles.nth(i);
      await tile.scrollIntoViewIfNeeded();
      await tile.focus();
      await page.keyboard.press("Enter");
      const dialog = page.getByRole("dialog");
      await expect(dialog, `dialog did not open for tile #${i}`).toBeVisible();
      const counter = dialog.locator("figcaption").last();
      await expect(counter).toContainText(`${i + 1} /`);
      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
      await expect(tile, `focus did not return to tile #${i}`).toBeFocused();
    }
  });

  test("tab and shift-tab traverse the grid in DOM order", async ({ page }) => {
    await page.goto("/gallery");
    const tiles = page.locator(TILE_SELECTOR);
    const total = await tiles.count();

    await tiles.first().focus();
    await expect(tiles.nth(0)).toBeFocused();

    // Tab forward across the first few tiles
    const forwardSteps = Math.min(5, total - 1);
    for (let i = 0; i < forwardSteps; i++) {
      await page.keyboard.press("Tab");
      await expect(tiles.nth(i + 1), `Tab #${i + 1} did not land on tile ${i + 1}`).toBeFocused();
    }

    // Shift+Tab back to the first tile
    for (let i = forwardSteps; i > 0; i--) {
      await page.keyboard.press("Shift+Tab");
      await expect(tiles.nth(i - 1), `Shift+Tab did not land on tile ${i - 1}`).toBeFocused();
    }
  });

  test("Tab focus stays trapped inside the dialog for the last (newly added) tile", async ({ page }) => {
    await page.goto("/gallery");
    const tiles = page.locator(TILE_SELECTOR);
    const last = tiles.last();
    await last.scrollIntoViewIfNeeded();
    await last.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      const contained = await page.evaluate(() => {
        const d = document.querySelector('[role="dialog"]');
        return !!d && d.contains(document.activeElement);
      });
      expect(contained, `focus escaped dialog after Tab #${i + 1}`).toBe(true);
    }

    // Shift+Tab must also stay trapped
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Shift+Tab");
      const contained = await page.evaluate(() => {
        const d = document.querySelector('[role="dialog"]');
        return !!d && d.contains(document.activeElement);
      });
      expect(contained, `focus escaped dialog after Shift+Tab #${i + 1}`).toBe(true);
    }
  });

  test("lightbox 'Request quote for this' CTA pre-selects the matching service", async ({ page }) => {
    await page.goto("/gallery");
    // Third tile is 8-ft galvanized enclosure (Chain Link) — deterministic.
    const tile = page.locator(TILE_SELECTOR).nth(2);
    await tile.scrollIntoViewIfNeeded();
    await tile.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    const cta = dialog.getByTestId("lightbox-quote-cta");
    await expect(cta).toBeVisible();
    const href = await cta.getAttribute("href");
    expect(href).toContain("/contact?");
    expect(href).toContain("source=gallery-lightbox");
    expect(href).toContain("service=Chain+Link+Fencing");
    expect(href).toMatch(/photo=[^&]+/);

    await Promise.all([page.waitForURL("**/contact*"), cta.click()]);
    // The service radio should be pre-checked from the URL param.
    const radio = page.getByRole("radio", { name: "Chain Link Fencing" });
    await expect(radio).toBeChecked();
  });
});
