import { test, expect, devices } from "@playwright/test";

/**
 * Responsive guardrail: the ContactFloater must show the full box
 * (Call, Text, Email, Google reviews) at every common phone and tablet
 * width. No icon-only / collapsed mobile variant is allowed.
 */
const widths = [
  { name: "iphone-se", width: 360, height: 780 },
  { name: "iphone-13", width: 390, height: 844 },
  { name: "iphone-plus", width: 414, height: 896 },
  { name: "ipad-mini", width: 768, height: 1024 },
  { name: "ipad-pro", width: 1024, height: 1366 },
  { name: "desktop", width: 1440, height: 900 },
];

for (const { name, width, height } of widths) {
  test(`floater shows Call/Text/Email/Reviews at ${name} (${width}px)`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");

    const floater = page.getByRole("complementary", { name: /contact ls fencing/i });
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
  });
}
