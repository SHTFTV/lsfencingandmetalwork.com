import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";

export const Route = createFileRoute("/chain-link-fencing")({
  head: () => ({
    meta: [
      { title: "Chain Link Fencing — Fraser Valley Installers" },
      { name: "description", content: "Galvanized and black vinyl-coated chain link fencing for commercial, industrial and residential properties." },
      { property: "og:title", content: "Chain Link Fencing — Fraser Valley Installers" },
      { property: "og:description", content: "Galvanized and black vinyl-coated chain link fencing for commercial, industrial and residential properties." },
      { property: "og:url", content: "/chain-link-fencing" },
    ],
    links: [{ rel: "canonical", href: "/chain-link-fencing" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero eyebrow="Chain Link Fencing" title="Service" intro="Galvanized and black vinyl-coated chain link fencing for commercial, industrial and residential properties." />
      <StubBody />
      <CtaStrip />
    </PageShell>
  );
}
