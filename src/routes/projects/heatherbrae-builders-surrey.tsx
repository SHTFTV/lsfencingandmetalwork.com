import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";

export const Route = createFileRoute("/projects/heatherbrae-builders-surrey")({
  head: () => ({
    meta: [
      { title: "10ft Galvanized Chain Link — Heatherbrae Builders, Surrey" },
      { name: "description", content: "Case study: 10-foot high galvanized chain link security fence installed for Heatherbrae Builders in Surrey, BC." },
      { property: "og:title", content: "10ft Galvanized Chain Link — Heatherbrae Builders, Surrey" },
      { property: "og:description", content: "Case study: 10-foot high galvanized chain link security fence installed for Heatherbrae Builders in Surrey, BC." },
      { property: "og:url", content: "/projects/heatherbrae-builders-surrey" },
    ],
    links: [{ rel: "canonical", href: "/projects/heatherbrae-builders-surrey" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero eyebrow="10ft Galvanized Chain Link — Heatherbrae Builders" title="Case Study — Surrey, BC" intro="Case study: 10-foot high galvanized chain link security fence installed for Heatherbrae Builders in Surrey, BC." />
      <StubBody />
      <CtaStrip />
    </PageShell>
  );
}
