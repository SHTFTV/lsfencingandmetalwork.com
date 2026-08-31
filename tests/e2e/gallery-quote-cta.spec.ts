import { test, expect, type Page } from "@playwright/test";

const TILE_SELECTOR = 'button[aria-label^="View "]';

async function waitForHydration(page: Page) {
  await page.locator('html[data-hydrated="true"]').waitFor();
}

const FENCE_SERVICES = new Set([
  "Chain Link Fencing",
  "Cedar Fencing",
  "Ornamental Fencing",
]);
const GATE_ONLY_SERVICES = new Set([
  "Metal / Driveway Gate",
  "Barrier Gates & Railings",
]);

async function fillAndSubmit(page: Page, service: string) {
  await expect(page.getByPlaceholder("e.g. Chilliwack")).toBeVisible();

  const linearFeet = page.getByPlaceholder("e.g. 120");
  if (await linearFeet.isVisible()) {
    await linearFeet.fill("100");
    await page.locator('select[name="fenceHeight"]').selectOption("6 ft");
  }

  const noGate = page.getByRole("radio", { name: "No gate needed" });
  const driveGate = page.getByRole("radio", { name: "Single drive gate" });
  if (await noGate.isVisible()) {
    await noGate.check();
  } else if (await driveGate.isVisible()) {
    await driveGate.check();
  }

  await page.getByPlaceholder("e.g. Chilliwack").fill("Chilliwack");
  await page.locator('select[name="timeline"]').selectOption("ASAP");
  await page.getByRole("button", { name: /^Next/i }).click();

  await expect(page.getByText("Review project")).toBeVisible();
  await page.locator('input[name="name"]').fill("QA Bot");
  await page.locator('input[name="phone"]').fill("6045551234");
  await page.locator('input[name="email"]').fill("qa+gallery@example.com");

  await page.getByRole("button", { name: /Send request/i }).click();
  await expect(page.getByRole("heading", { name: "Request received" })).toBeVisible({
    timeout: 15_000,
  });
}

test.describe("/gallery lightbox CTA → /contact submit attribution", () => {
  test("every tile carries service + source + photo attribution through submit", async ({ page, context }) => {
    test.setTimeout(10 * 60 * 1000);
    // Capture analytics events fired on every navigation via a context-scoped init script.
    await context.addInitScript(() => {
      // @ts-expect-error test-only global
      window.__quoteEvents = [];
      window.addEventListener("lovable:analytics", (e) => {
        // @ts-expect-error test-only global
        window.__quoteEvents.push((e as CustomEvent).detail);
      });
    });

    // Intercept the server function POST once for the whole test and stub OK.
    const submitBodies: string[] = [];
    await context.route(/_server(?:Fn|-fn)?|__serverFn/i, async (route) => {
      const body = route.request().postData();
      if (body) submitBodies.push(body);
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ result: { ok: true, id: "stub", delivered: true } }),
      });
    });

    await page.goto("/gallery");
    await waitForHydration(page);
    const tileCount = await page.locator(TILE_SELECTOR).count();
    expect(tileCount).toBeGreaterThanOrEqual(15);

    for (let i = 0; i < tileCount; i++) {
      const beforeBodies = submitBodies.length;
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

      const url = new URL(href!, page.url());
      const expectedService = url.searchParams.get("service");
      const expectedPhoto = url.searchParams.get("photo")!;

      await Promise.all([page.waitForURL("**/contact*"), cta.click()]);

      const finalUrl = new URL(page.url());
      expect(finalUrl.searchParams.get("source")).toBe("gallery-lightbox");
      expect(finalUrl.searchParams.get("photo")).toBe(expectedPhoto);
      if (expectedService) {
        expect(finalUrl.searchParams.get("service")).toBe(expectedService);
        await fillAndSubmit(page, expectedService);
      } else {
        await page.getByRole("radio", { name: "Welding / Repair" }).check();
        await fillAndSubmit(page, "Welding / Repair");
      }

      // Analytics
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

      // Payload — at least one new body captured since iteration start includes attribution.
      const newBodies = submitBodies.slice(beforeBodies);
      if (newBodies.length > 0) {
        expect(newBodies.some((b) => b.includes(expectedPhoto))).toBe(true);
        expect(newBodies.some((b) => b.includes("gallery-lightbox"))).toBe(true);
      }

      // Reset analytics + return to gallery for next tile
      await page.evaluate(() => {
        // @ts-expect-error test-only global
        window.__quoteEvents = [];
      });
      await page.goto("/gallery");
      await waitForHydration(page);
    }
  });
});
