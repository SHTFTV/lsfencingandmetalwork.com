import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";

export const Route = createFileRoute("/commercial-chain-link-fencing")({
  head: () => ({
    meta: [
      { title: "Commercial Chain Link Fencing BC" },
      { name: "description", content: "Heavy-gauge commercial chain link with barbed wire, privacy slats, and gate systems for BC job sites." },
      { property: "og:title", content: "Commercial Chain Link Fencing BC" },
      { property: "og:description", content: "Heavy-gauge commercial chain link with barbed wire, privacy slats, and gate systems for BC job sites." },
      { property: "og:url", content: "/commercial-chain-link-fencing" },
    ],
    links: [{ rel: "canonical", href: "/commercial-chain-link-fencing" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero eyebrow="Commercial Chain Link Fencing" title="Commercial" intro="Heavy-gauge commercial chain link with barbed wire, privacy slats, and gate systems for BC job sites." />
      <StubBody />
      <CtaStrip />
    </PageShell>
  );
}
