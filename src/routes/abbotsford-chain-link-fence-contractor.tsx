import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";

export const Route = createFileRoute("/abbotsford-chain-link-fence-contractor")({
  head: () => ({
    meta: [
      { title: "Abbotsford Chain Link Fence Contractor" },
      { name: "description", content: "Abbotsford fence contractor for chain link, gates and industrial site fencing. Free on-site quotes." },
      { property: "og:title", content: "Abbotsford Chain Link Fence Contractor" },
      { property: "og:description", content: "Abbotsford fence contractor for chain link, gates and industrial site fencing. Free on-site quotes." },
      { property: "og:url", content: "/abbotsford-chain-link-fence-contractor" },
    ],
    links: [{ rel: "canonical", href: "/abbotsford-chain-link-fence-contractor" }],
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
