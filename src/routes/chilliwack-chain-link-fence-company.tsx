import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";

export const Route = createFileRoute("/chilliwack-chain-link-fence-company")({
  head: () => ({
    meta: [
      { title: "Chilliwack Chain Link Fence Company" },
      { name: "description", content: "Local chain link fence installation in Chilliwack, BC. Residential yards, farms and commercial security fencing." },
      { property: "og:title", content: "Chilliwack Chain Link Fence Company" },
      { property: "og:description", content: "Local chain link fence installation in Chilliwack, BC. Residential yards, farms and commercial security fencing." },
      { property: "og:url", content: "/chilliwack-chain-link-fence-company" },
    ],
    links: [{ rel: "canonical", href: "/chilliwack-chain-link-fence-company" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero eyebrow="Chilliwack Chain Link Fence Company" title="Chilliwack, BC" intro="Local chain link fence installation in Chilliwack, BC. Residential yards, farms and commercial security fencing." />
      <StubBody />
      <CtaStrip />
    </PageShell>
  );
}
