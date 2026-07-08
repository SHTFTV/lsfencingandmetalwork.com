import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";

export const Route = createFileRoute("/projects/cooper-rentals-langley")({
  head: () => ({
    meta: [
      { title: "Double Cantilever Gate — Cooper Rentals, Langley" },
      { name: "description", content: "Case study: dual-panel cantilever slide gate fabricated and installed for Cooper Rentals in Langley, BC." },
      { property: "og:title", content: "Double Cantilever Gate — Cooper Rentals, Langley" },
      { property: "og:description", content: "Case study: dual-panel cantilever slide gate fabricated and installed for Cooper Rentals in Langley, BC." },
      { property: "og:url", content: "/projects/cooper-rentals-langley" },
    ],
    links: [{ rel: "canonical", href: "/projects/cooper-rentals-langley" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero eyebrow="Double Cantilever Gate — Cooper Rentals" title="Case Study — Langley, BC" intro="Case study: dual-panel cantilever slide gate fabricated and installed for Cooper Rentals in Langley, BC." />
      <StubBody />
      <CtaStrip />
    </PageShell>
  );
}
