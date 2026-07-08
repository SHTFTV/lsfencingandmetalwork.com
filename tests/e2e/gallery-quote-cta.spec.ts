import { test, expect, type Page } from "@playwright/test";

const TILE_SELECTOR = 'button[aria-label^="View "]';

// Fence services need extra fields; gate-only need gate; others just city+timeline.
const FENCE_SERVICES = new Set([
  "Chain Link Fencing",
  "Cedar Fencing",
  "Ornamental Fencing",
]);
const GATE_ONLY_SERVICES = new Set([
  "Metal / Driveway Gate",
  "Barrier Gates & Railings",
]);

async function installAnalyticsCapture(page: Page) {
  await page.addInitScript(() => {
    // @ts-expect-error attach for the test
    window.__quoteEvents = [];
    window.addEventListener("lovable:analytics", (e) => {
      // @ts-expect-error attach for the test
      window.__quoteEvents.push((e as CustomEvent).detail);
    });
  });
}

async function stubSubmit(page: Page): Promise<{ bodies: string[] }> {
  const bodies: string[] = [];
  await page.route(/_serverFn|_server-fn|__serverFn/i, async (route) => {
    const body = route.request().postData();
    if (body) bodies.push(body);
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ result: { ok: true, id: "stub", delivered: true } }),
    });
  });
  return { bodies };
}

async function fillAndSubmit(page: Page, service: string) {
  await expect(page.getByPlaceholder("e.g. Chilliwack")).toBeVisible();

  if (FENCE_SERVICES.has(service)) {
    await page.getByPlaceholder("e.g. 120").fill("100");
    await page.getByLabel("Fence height").selectOption("6 ft");
    await page.getByRole("radio", { name: "No gate needed" }).check();
  } else if (GATE_ONLY_SERVICES.has(service)) {
    await page.getByRole("radio", { name: "Single drive gate" }).check();
  }

  await page.getByLabel(/City \/ neighbourhood/i).fill("Chilliwack");
  await page.getByLabel("Timeline").selectOption("ASAP");
  await page.getByRole("button", { name: /^Next/i }).click();

  await expect(page.getByText("Review project")).toBeVisible();
  await page.getByLabel("Your name").fill("QA Bot");
  await page.getByLabel("Phone").fill("6045551234");
  await page.getByLabel("Email").fill("qa+gallery@example.com");

  await page.getByRole("button", { name: /Send request/i }).click();
  await expect(page.getByRole("heading", { name: "Request received" })).toBeVisible({ timeout: 15_000 });
}

test.describe("/gallery lightbox CTA → /contact submit attribution", () => {
  test("every tile carries service + source + photo attribution through submit", async ({ page }) => {
    await installAnalyticsCapture(page);
    await page.goto("/gallery");

    const tileCount = await page.locator(TILE_SELECTOR).count();
    expect(tileCount).toBeGreaterThanOrEqual(15);

    for (let i = 0; i < tileCount; i++) {
      const tile = page.locator(TILE_SELECTOR).nth(i);
      await tile.scrollIntoViewIfNeeded();
      await tile.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();

      const cta = dialog.getByTestId("lightbox-quote-cta");
      const href = await cta.getAttribute("href");
      expect(href, `tile #${i} CTA missing href`).toBeTruthy();
      expect(href!).toMatch(/^\/contact\?/);
      expect(href!).toContain("source=gallery-lightbox");
      expect(href!).toMatch(/photo=[a-z0-9-]+/);

      // Parse expected service (if the category maps to one).
      const url = new URL(href!, page.url());
      const expectedService = url.searchParams.get("service");
      const expectedPhoto = url.searchParams.get("photo")!;

      const { bodies } = await stubSubmit(page);
      await Promise.all([page.waitForURL("**/contact*"), cta.click()]);

      // URL retains attribution
      const finalUrl = new URL(page.url());
      expect(finalUrl.searchParams.get("source")).toBe("gallery-lightbox");
      expect(finalUrl.searchParams.get("photo")).toBe(expectedPhoto);
      if (expectedService) {
        expect(finalUrl.searchParams.get("service")).toBe(expectedService);
        await fillAndSubmit(page, expectedService);
      } else {
        // No mapped service — user picks one manually.
        await page.getByRole("radio", { name: "Welding / Repair" }).check();
        await fillAndSubmit(page, "Welding / Repair");
      }

      // Analytics: quote_submit_attempt + quote_submit_success both fired with attribution.
      const events = await page.evaluate(
        // @ts-expect-error test-only global
        () => (window.__quoteEvents ?? []).slice(),
      );
      const attempts = events.filter((e: { name: string }) => e.name === "quote_submit_attempt");
      const successes = events.filter((e: { name: string }) => e.name === "quote_submit_success");
      expect(attempts.length, `tile #${i} no attempt event`).toBeGreaterThan(0);
      expect(successes.length, `tile #${i} no success event`).toBeGreaterThan(0);
      const last = successes[successes.length - 1];
      expect(last.source, `tile #${i} attribution.source missing`).toBe("gallery-lightbox");
      expect(last.photo, `tile #${i} attribution.photo missing`).toBe(expectedPhoto);

      // Payload sent to the server includes the photo tag in notes.
      if (bodies.length > 0) {
        expect(bodies.some((b) => b.includes(expectedPhoto))).toBe(true);
        expect(bodies.some((b) => b.includes("gallery-lightbox"))).toBe(true);
      }

      await page.unroute(/_serverFn|_server-fn|__serverFn/i);
      // Reset for next tile
      await page.goto("/gallery");
      await installAnalyticsCapture(page);
    }
  });
});
