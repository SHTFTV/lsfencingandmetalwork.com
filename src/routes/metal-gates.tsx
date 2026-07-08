import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";

export const Route = createFileRoute("/metal-gates")({
  head: () => ({
    meta: [
      { title: "Custom Metal Gates — Driveway & Cantilever" },
      { name: "description", content: "Cantilever, swing, and slide driveway gates fabricated in-house — from privacy louvered panels to heavy industrial spans." },
      { property: "og:title", content: "Custom Metal Gates — Driveway & Cantilever" },
      { property: "og:description", content: "Cantilever, swing, and slide driveway gates fabricated in-house — from privacy louvered panels to heavy industrial spans." },
      { property: "og:url", content: "/metal-gates" },
    ],
    links: [{ rel: "canonical", href: "/metal-gates" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero eyebrow="Custom Metal Gates" title="Service" intro="Cantilever, swing, and slide driveway gates fabricated in-house — from privacy louvered panels to heavy industrial spans." />
      <StubBody />
      <CtaStrip />
    </PageShell>
  );
}
