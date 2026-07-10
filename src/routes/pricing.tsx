import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Fence & Gate Cost Estimates BC" },
      { name: "description", content: "Transparent pricing ranges for chain link, cedar, ornamental fencing, gates and metal fabrication in BC." },
      { property: "og:title", content: "Pricing — Fence & Gate Cost Estimates BC" },
      { property: "og:description", content: "Transparent pricing ranges for chain link, cedar, ornamental fencing, gates and metal fabrication in BC." },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero eyebrow="Pricing" title="Straight-Up Pricing" intro="Transparent pricing ranges for chain link, cedar, ornamental fencing, gates and metal fabrication in BC." />
      <section className="container-industrial pt-16 pb-0">
        <h2 className="text-3xl font-semibold tracking-tight">How LS Fencing prices fence and gate work</h2>
      </section>
      <StubBody />
      <CtaStrip />
    </PageShell>
  );
}
