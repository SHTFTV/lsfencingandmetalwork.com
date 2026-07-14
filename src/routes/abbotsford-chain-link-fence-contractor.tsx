import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";
import { absoluteUrl } from "@/lib/site";

const CANONICAL = absoluteUrl("/abbotsford-chain-link-fence-contractor");

export const Route = createFileRoute("/abbotsford-chain-link-fence-contractor")({
  head: () => ({
    meta: [
      { title: "Abbotsford Chain Link Fence Contractor | LS Fencing & Metal Work" },
      { name: "description", content: "Abbotsford fence contractor for chain link, gates and industrial site fencing. Free on-site quotes — call or text 604-758-0014." },
      { property: "og:title", content: "Abbotsford Chain Link Fence Contractor" },
      { property: "og:description", content: "Abbotsford fence contractor for chain link, gates and industrial site fencing. Free on-site quotes." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero eyebrow="Abbotsford Chain Link Fence Contractor" title="Abbotsford, BC" intro="Abbotsford fence contractor for chain link, gates and industrial site fencing. Free on-site quotes." />
      <StubBody />
      <CtaStrip />
    </PageShell>
  );
}
