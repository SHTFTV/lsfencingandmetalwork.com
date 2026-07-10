import { expect, test } from "@playwright/test";

test("each blog card renders exactly one unique hero image", async ({ page }) => {
  await page.goto("/blog", { waitUntil: "networkidle" });

  const cards = page.locator('a[href^="/blog/"]');
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);

  const srcs: string[] = [];
  for (let i = 0; i < count; i++) {
    const card = cards.nth(i);
    const imgs = card.locator("img");
    await expect(imgs, `card ${i} should render exactly one hero image`).toHaveCount(1);
    const src = await imgs.first().evaluate((el: HTMLImageElement) => el.currentSrc || el.src);
    srcs.push(src);
  }

  const dupes = srcs.filter((s, i) => srcs.indexOf(s) !== i);
  expect(dupes, `duplicate hero images across blog cards: ${dupes.join(", ")}`).toEqual([]);
});
