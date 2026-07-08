import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";

export const Route = createFileRoute("/projects/cantilever-gates-chilliwack")({
  head: () => ({
    meta: [
      { title: "Premium 6x24 Cantilever Gates — Chilliwack" },
      { name: "description", content: "Case study: premium 6ft x 24ft galvanized chain link cantilever gates installed in Chilliwack, BC." },
      { property: "og:title", content: "Premium 6x24 Cantilever Gates — Chilliwack" },
      { property: "og:description", content: "Case study: premium 6ft x 24ft galvanized chain link cantilever gates installed in Chilliwack, BC." },
      { property: "og:url", content: "/projects/cantilever-gates-chilliwack" },
    ],
    links: [{ rel: "canonical", href: "/projects/cantilever-gates-chilliwack" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero eyebrow="Premium 6x24 Cantilever Gates" title="Case Study — Chilliwack, BC" intro="Case study: premium 6ft x 24ft galvanized chain link cantilever gates installed in Chilliwack, BC." />
      <StubBody />
      <CtaStrip />
    </PageShell>
  );
}
