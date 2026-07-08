import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";

export const Route = createFileRoute("/projects/railing-installation-maple-ridge")({
  head: () => ({
    meta: [
      { title: "MMCD-Spec Railing Installation — Maple Ridge" },
      { name: "description", content: "Case study: professional MMCD-spec galvanized pipe railing installation completed in Maple Ridge, BC." },
      { property: "og:title", content: "MMCD-Spec Railing Installation — Maple Ridge" },
      { property: "og:description", content: "Case study: professional MMCD-spec galvanized pipe railing installation completed in Maple Ridge, BC." },
      { property: "og:url", content: "/projects/railing-installation-maple-ridge" },
    ],
    links: [{ rel: "canonical", href: "/projects/railing-installation-maple-ridge" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero eyebrow="MMCD-Spec Railing Installation" title="Case Study — Maple Ridge, BC" intro="Case study: professional MMCD-spec galvanized pipe railing installation completed in Maple Ridge, BC." />
      <StubBody />
      <CtaStrip />
    </PageShell>
  );
}
