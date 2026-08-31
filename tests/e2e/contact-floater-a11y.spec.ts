import { test, expect } from "@playwright/test";

/**
 * Accessibility guardrails for the ContactFloater. Ensures future changes
 * don't regress ARIA labels, keyboard tab order, or focus-visible styling.
 */
test.describe("ContactFloater accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
  });

  test("landmark and every interactive element has an accessible name", async ({ page }) => {
    const floater = page.getByRole("complementary", { name: /contact ls fencing/i });
    await expect(floater).toBeVisible();

    // Every link/button inside must have an accessible name.
    const interactives = floater.locator("a, button");
    const count = await interactives.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const el = interactives.nth(i);
      const name =
        (await el.getAttribute("aria-label")) ??
        (await el.textContent())?.trim() ??
        "";
      expect(name, `element #${i} missing accessible name`).not.toEqual("");
    }
  });

  test("Read Google Reviews CTA opens in a new tab with rel noopener", async ({ page }) => {
    const cta = page.getByRole("link", { name: /read all .* google reviews/i });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("target", "_blank");
    await expect(cta).toHaveAttribute("rel", /noopener/);
  });

  test("keyboard tab order reaches every floater action", async ({ page }) => {
    const floater = page.getByRole("complementary", { name: /contact ls fencing/i });
    const expectedNames = [
      /hide contact panel/i,
      /call ls fencing/i,
      /text ls fencing/i,
      /email ls fencing/i,
      /read all .* google reviews/i,
    ];

    // Focus the floater's first interactive element, then tab through.
    await floater.locator("a, button").first().focus();
    for (const expected of expectedNames) {
      const active = page.locator(":focus");
      const label =
        (await active.getAttribute("aria-label")) ??
        (await active.textContent())?.trim() ??
        "";
      expect(label).toMatch(expected);
      await page.keyboard.press("Tab");
    }
  });

  test("focused element renders a visible focus ring", async ({ page }) => {
    const cta = page.getByRole("link", { name: /read all .* google reviews/i });
    await cta.focus();
    // Tailwind focus-visible:ring-2 produces a non-zero box-shadow outline.
    const boxShadow = await cta.evaluate((el) => getComputedStyle(el).boxShadow);
    expect(boxShadow).not.toBe("none");
  });
});
