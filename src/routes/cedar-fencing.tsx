import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";

export const Route = createFileRoute("/cedar-fencing")({
  head: () => ({
    meta: [
      { title: "Cedar Fencing — Custom Wood Fences BC" },
      { name: "description", content: "Premium western red cedar privacy fences and lattice tops, hand-built to survive BC weather." },
      { property: "og:title", content: "Cedar Fencing — Custom Wood Fences BC" },
      { property: "og:description", content: "Premium western red cedar privacy fences and lattice tops, hand-built to survive BC weather." },
      { property: "og:url", content: "/cedar-fencing" },
    ],
    links: [{ rel: "canonical", href: "/cedar-fencing" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero eyebrow="Cedar Fencing" title="Service" intro="Premium western red cedar privacy fences and lattice tops, hand-built to survive BC weather." />
      <StubBody />
      <CtaStrip />
    </PageShell>
  );
}
