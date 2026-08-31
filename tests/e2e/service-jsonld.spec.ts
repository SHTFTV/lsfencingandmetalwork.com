import { test, expect } from "@playwright/test";

const SERVICE_PAGES = [
  { path: "/chain-link-fencing", name: "Chain Link Fencing" },
  { path: "/cedar-fencing", name: "Cedar Fencing" },
  { path: "/ornamental-fencing", name: "Ornamental Iron Fencing" },
  { path: "/metal-gates", name: "Custom Metal Gates" },
  { path: "/welding-services", name: "Welding & Metal Fabrication" },
  { path: "/excavation-services", name: "Excavation Services" },
  { path: "/barrier-gates", name: "Barrier Gates & Hand Rails" },
];

for (const { path, name } of SERVICE_PAGES) {
  test(`${path} emits valid Service + FAQPage JSON-LD`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });
    const blocks = await page.$$eval(
      'script[type="application/ld+json"]',
      (nodes) => nodes.map((n) => n.textContent ?? ""),
    );
    expect(blocks.length).toBeGreaterThanOrEqual(2);

    const parsed = blocks.map((b) => JSON.parse(b));
    const service = parsed.find((p) => p["@type"] === "Service");
    const faq = parsed.find((p) => p["@type"] === "FAQPage");

    expect(service, "Service schema present").toBeTruthy();
    expect(service["@context"]).toBe("https://schema.org");
    expect(service.name).toBe(name);
    expect(typeof service.description).toBe("string");
    expect(service.description.length).toBeGreaterThan(30);
    expect(service.description.length).toBeLessThan(320);
    expect(service.url).toBe(`https://lsfencingandmetalwork.com${path}`);
    expect(service.provider?.["@type"]).toBe("LocalBusiness");
    expect(Array.isArray(service.areaServed)).toBe(true);

    expect(faq, "FAQPage schema present").toBeTruthy();
    expect(faq["@context"]).toBe("https://schema.org");
    expect(Array.isArray(faq.mainEntity)).toBe(true);
    expect(faq.mainEntity.length).toBeGreaterThan(0);
    for (const q of faq.mainEntity) {
      expect(q["@type"]).toBe("Question");
      expect(q.name?.length).toBeGreaterThan(4);
      expect(q.acceptedAnswer?.["@type"]).toBe("Answer");
      expect(q.acceptedAnswer?.text?.length).toBeGreaterThan(9);
    }
  });
}
