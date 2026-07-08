import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Fencing Tips, Guides & Industry News" },
      { name: "description", content: "Guides on chain link vs cedar, gate options, cost breakdowns, and job stories from the field." },
      { property: "og:title", content: "Blog — Fencing Tips, Guides & Industry News" },
      { property: "og:description", content: "Guides on chain link vs cedar, gate options, cost breakdowns, and job stories from the field." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero eyebrow="Blog" title="Field Notes & Guides" intro="Guides on chain link vs cedar, gate options, cost breakdowns, and job stories from the field." />
      <StubBody />
      <CtaStrip />
    </PageShell>
  );
}
