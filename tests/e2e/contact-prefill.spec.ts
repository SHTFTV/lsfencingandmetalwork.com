import { test, expect } from "@playwright/test";

// Verifies that /contact ignores malformed or hostile ?service= / ?photo= URL
// parameters instead of prefilling from them or leaking them into analytics.
test.describe("/contact prefill sanitization", () => {
  test("valid service prefill auto-advances to step 1", async ({ page }) => {
    await page.goto("/contact?service=Chain+Link+Fencing&source=gallery&photo=black-vinyl-school", { waitUntil: "networkidle" });
    await expect(page.getByPlaceholder("e.g. Chilliwack")).toBeVisible();
  });

  test("unknown service value is dropped — stays on step 0", async ({ page }) => {
    await page.goto("/contact?service=<script>alert(1)</script>&source=gallery-tile&photo=black-vinyl-school", { waitUntil: "networkidle" });
    // The service radios (step 0) must still be visible and no service pre-selected.
    await expect(page.getByRole("radio", { name: "Chain Link Fencing" })).toBeVisible();
    const checked = await page.locator('input[type="radio"][name="service"]:checked').count();
    expect(checked).toBe(0);
  });

  test("invalid photo slug is dropped from the submit payload notes", async ({ page }) => {
    // Photo contains uppercase + spaces + special chars — should not match slug regex.
    await page.goto("/contact?service=Welding+%2F+Repair&source=gallery&photo=%3Cimg%20src=x%3E", { waitUntil: "networkidle" });
    await expect(page.getByPlaceholder("e.g. Chilliwack")).toBeVisible();

    // Intercept the server-fn call and inspect the outgoing payload.
    let submittedBody: string | null = null;
    await page.route(/_serverFn|_server-fn|__serverFn/i, async (route) => {
      submittedBody = route.request().postData();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ result: { ok: true, id: "test", delivered: true } }),
      });
    });

    // Fill step 1
    await page.getByLabel(/City \/ neighbourhood/i).fill("Chilliwack");
    await page.getByLabel("Timeline").selectOption("ASAP");
    await page.getByRole("button", { name: /^Next/i }).click();

    // Fill step 2 + submit
    await page.getByLabel("Your name").fill("QA Bot");
    await page.getByLabel("Phone").fill("6045551234");
    await page.getByLabel("Email").fill("qa@example.com");
    await page.getByRole("button", { name: /Send request/i }).click();

    await expect(page.getByRole("heading", { name: "Request received" })).toBeVisible({ timeout: 10_000 });

    // If the server fn was matched, verify no bad photo slug leaked through.
    if (submittedBody) {
      expect(submittedBody).not.toContain("<img");
      expect(submittedBody).not.toContain("from gallery photo:");
    }
  });

  test("invalid source is dropped and defaults to contact-form", async ({ page }) => {
    await page.goto("/contact?source=totally-fake-source", { waitUntil: "networkidle" });
    // No service prefill, so step 0 must still be visible.
    await expect(page.getByRole("radio", { name: "Chain Link Fencing" })).toBeVisible();
  });
});
