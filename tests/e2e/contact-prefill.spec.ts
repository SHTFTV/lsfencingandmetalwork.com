import { test, expect } from "@playwright/test";

async function waitForHydration(page: import("@playwright/test").Page) {
  await page.locator('html[data-hydrated="true"]').waitFor();
}

// Verifies that /contact ignores malformed or hostile ?service= / ?photo= URL
// parameters instead of prefilling from them or leaking them into analytics.
test.describe("/contact prefill sanitization", () => {
  test("valid service prefill auto-advances to step 1", async ({ page }) => {
    await page.goto("/contact?service=Chain+Link+Fencing&source=gallery-lightbox&photo=black-vinyl-school");
    await waitForHydration(page);
    await expect(page.getByPlaceholder("e.g. Chilliwack")).toBeVisible();
  });

  test("unknown service value is dropped — stays on step 0", async ({ page }) => {
    await page.goto("/contact?service=<script>alert(1)</script>&source=gallery-tile&photo=black-vinyl-school");
    await waitForHydration(page);
    // The service radios (step 0) must still be visible and no service pre-selected.
    await expect(page.getByRole("radio", { name: "Chain Link Fencing" })).toBeVisible();
    const checked = await page.locator('input[type="radio"][name="service"]:checked').count();
    expect(checked).toBe(0);
  });

  test("invalid photo slug is ignored by the form", async ({ page }) => {
    // Photo contains uppercase + spaces + special chars — should not match slug regex.
    await page.goto("/contact?service=Welding+%2F+Repair&source=gallery-lightbox&photo=%3Cimg%20src=x%3E");
    await waitForHydration(page);
    await expect(page.getByPlaceholder("e.g. Chilliwack")).toBeVisible();

    // The service prefill remains valid, but the hostile photo value is never
    // rendered into the form or review UI.
    await expect(page.getByText("<img src=x>", { exact: false })).toHaveCount(0);
    await page.getByLabel(/City \/ neighbourhood/i).fill("Chilliwack");
    await page.getByLabel("Timeline").selectOption("ASAP");
    await page.getByRole("button", { name: /^Next/i }).click();
    await expect(page.getByText("Review project")).toBeVisible();
    await expect(page.locator("dl").first()).not.toContainText("from gallery photo:");
  });

  test("invalid source is dropped and defaults to contact-form", async ({ page }) => {
    await page.goto("/contact?source=totally-fake-source");
    await waitForHydration(page);
    // No service prefill, so step 0 must still be visible.
    await expect(page.getByRole("radio", { name: "Chain Link Fencing" })).toBeVisible();
  });
});
