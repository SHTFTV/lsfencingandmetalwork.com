import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";
import { absoluteUrl } from "@/lib/site";

const CANONICAL = absoluteUrl("/chilliwack-chain-link-fence-company");

export const Route = createFileRoute("/chilliwack-chain-link-fence-company")({
  head: () => ({
    meta: [
      { title: "Chilliwack Chain Link Fence Company | LS Fencing & Metal Work" },
      { name: "description", content: "Local chain link fence installation in Chilliwack, BC. Residential yards, farms and commercial security fencing. Free on-site quotes — call or text 604-758-0014." },
      { property: "og:title", content: "Chilliwack Chain Link Fence Company" },
      { property: "og:description", content: "Local chain link fence installation in Chilliwack, BC. Residential yards, farms and commercial security fencing." },
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
      <PageHero eyebrow="Chilliwack Chain Link Fence Company" title="Chilliwack, BC" intro="Local chain link fence installation in Chilliwack, BC. Residential yards, farms and commercial security fencing." />
      <StubBody />
      <CtaStrip />
    </PageShell>
  );
}
