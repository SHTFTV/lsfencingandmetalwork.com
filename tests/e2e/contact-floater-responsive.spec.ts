import { test, expect } from "@playwright/test";

/** Desktop keeps contact links visible; mobile opens them on request so the
 * card does not cover the page. Every option must remain reachable. */
const widths = [
  { name: "iphone-se", width: 360, height: 780 },
  { name: "iphone-13", width: 390, height: 844 },
  { name: "iphone-plus", width: 414, height: 896 },
  { name: "ipad-mini", width: 768, height: 1024 },
  { name: "ipad-pro", width: 1024, height: 1366 },
  { name: "desktop", width: 1440, height: 900 },
];

for (const { name, width, height } of widths) {
  test(`contact options remain accessible at ${name} (${width}px)`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/", { waitUntil: "networkidle" });

    const floater = page.getByRole("complementary", { name: /contact ls fencing/i });
    const trigger = page.getByRole("button", { name: "Contact LS Fencing", exact: true });
    if (width < 768) {
      await expect(floater).toBeHidden();
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
      await trigger.click();
      await expect(page.getByRole("button", { name: "Close contact options", exact: true })).toHaveAttribute("aria-expanded", "true");
    } else {
      await expect(trigger).toBeHidden();
    }
    await expect(floater).toBeVisible();

    await expect(floater.getByRole("link", { name: /call ls fencing/i })).toBeVisible();
    await expect(floater.getByRole("link", { name: /text ls fencing/i })).toBeVisible();
    await expect(floater.getByRole("link", { name: /email ls fencing/i })).toBeVisible();
    await expect(floater.getByRole("link", { name: /read all .* google reviews/i })).toBeVisible();

    // Must not overflow the viewport horizontally.
    const box = await floater.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width + 1);
    }
    if (width < 768) {
      await page.getByRole("button", { name: "Close contact options", exact: true }).click();
      await expect(floater).toBeHidden();
      await trigger.click();
      await expect(floater).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(floater).toBeHidden();
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
    }
  });
}
