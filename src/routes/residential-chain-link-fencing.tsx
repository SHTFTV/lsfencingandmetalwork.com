import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";

export const Route = createFileRoute("/residential-chain-link-fencing")({
  head: () => ({
    meta: [
      { title: "Residential Chain Link Fencing — Fraser Valley" },
      { name: "description", content: "Black vinyl and galvanized chain link for backyards, pools, and pet enclosures — clean install, quick turnaround." },
      { property: "og:title", content: "Residential Chain Link Fencing — Fraser Valley" },
      { property: "og:description", content: "Black vinyl and galvanized chain link for backyards, pools, and pet enclosures — clean install, quick turnaround." },
      { property: "og:url", content: "/residential-chain-link-fencing" },
    ],
    links: [{ rel: "canonical", href: "/residential-chain-link-fencing" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero eyebrow="Residential Chain Link Fencing" title="Residential" intro="Black vinyl and galvanized chain link for backyards, pools, and pet enclosures — clean install, quick turnaround." />
      <StubBody />
      <CtaStrip />
    </PageShell>
  );
}
