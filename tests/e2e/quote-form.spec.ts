import { test, expect } from "@playwright/test";

async function waitForHydration(page: import("@playwright/test").Page) {
  await page.locator('html[data-hydrated="true"]').waitFor();
}

test.describe("/contact multi-step quote validation", () => {
  test("cannot advance past step 0 without picking a service", async ({ page }) => {
    await page.goto("/contact");
    await waitForHydration(page);
    await page.getByRole("button", { name: /^Next/i }).click();
    await expect(page.getByText("Pick a service")).toBeVisible();
  });

  test("fence services require linear feet, height and gate", async ({ page }) => {
    await page.goto("/contact");
    await waitForHydration(page);
    await page.getByRole("radio", { name: "Chain Link Fencing" }).check();
    // Auto-advances to step 1
    await expect(page.getByText(/Approximate linear feet/i)).toBeVisible();

    await page.getByRole("button", { name: /^Next/i }).click();
    await expect(page.getByText("Enter approximate linear feet")).toBeVisible();
    await expect(page.getByText("Pick a fence height")).toBeVisible();
    await expect(page.getByText("Pick a gate option")).toBeVisible();
    await expect(page.getByText("Enter your city")).toBeVisible();
    await expect(page.getByText("Pick a timeline")).toBeVisible();
  });

  test("non-fence service skips linear feet and gate fields", async ({ page }) => {
    await page.goto("/contact");
    await waitForHydration(page);
    await page.getByRole("radio", { name: "Welding / Repair" }).check();
    await expect(page.getByText(/No linear-feet or gate details needed/i)).toBeVisible();
    await expect(page.getByText(/Approximate linear feet/i)).toHaveCount(0);
    await expect(page.getByText(/Gate requirements/i)).toHaveCount(0);
    await expect(page.getByText(/Gate type/i)).toHaveCount(0);
  });

  test("gate-only service requires gate type but not linear feet", async ({ page }) => {
    await page.goto("/contact");
    await waitForHydration(page);
    await page.getByRole("radio", { name: "Metal / Driveway Gate" }).check();
    await expect(page.getByText(/Gate type/i)).toBeVisible();
    await expect(page.getByText(/Approximate linear feet/i)).toHaveCount(0);

    await page.getByRole("button", { name: /^Next/i }).click();
    await expect(page.getByText("Pick a gate type")).toBeVisible();
  });

  test("review card shows only relevant fields for chosen service", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/contact");
    await waitForHydration(page);
    await page.getByRole("radio", { name: "Welding / Repair" }).check();
    await expect(page.getByText(/No linear-feet or gate details needed/i)).toBeVisible();

    await page.getByPlaceholder("e.g. Chilliwack").fill("Chilliwack");
    await page.locator('select[name="timeline"]').selectOption("ASAP");
    await page.getByRole("button", { name: /^Next/i }).click();

    await expect(page.getByText("Review project")).toBeVisible();
    // Fence-only labels must not appear in the review card
    const review = page.locator("dl").first();
    await expect(review).not.toContainText("Linear ft");
    await expect(review).not.toContainText("Height");
    await expect(review).not.toContainText("Gate");
    await expect(review).toContainText("Service");
    await expect(review).toContainText("City");
    await expect(review).toContainText("Timeline");
  });
});
