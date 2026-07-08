import { test, expect } from "@playwright/test";

test.describe("/gallery lightbox keyboard + focus trap", () => {
  test("opens with Enter, Escape closes and returns focus to tile", async ({ page }) => {
    await page.goto("/gallery");
    const firstTile = page.getByRole("button", { name: /^View / }).first();
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
    await page.getByRole("button", { name: /^View / }).first().click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    const counter = dialog.locator("figcaption").last();
    await expect(counter).toContainText("1 /");

    await page.keyboard.press("ArrowRight");
    await expect(counter).toContainText("2 /");

    await page.keyboard.press("ArrowLeft");
    await expect(counter).toContainText("1 /");
  });

  test("Tab focus stays trapped inside the dialog", async ({ page }) => {
    await page.goto("/gallery");
    await page.getByRole("button", { name: /^View / }).first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Cycle Tab many times — focus must never escape the dialog.
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press("Tab");
      const contained = await page.evaluate(() => {
        const d = document.querySelector('[role="dialog"]');
        return !!d && d.contains(document.activeElement);
      });
      expect(contained, `focus escaped dialog after Tab #${i + 1}`).toBe(true);
    }
  });
});
