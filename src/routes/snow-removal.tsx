import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";

export const Route = createFileRoute("/snow-removal")({
  head: () => ({
    meta: [
      { title: "Commercial Snow Removal — Fraser Valley" },
      { name: "description", content: "Contract and on-call snow removal for commercial lots, walkways and driveways across the Fraser Valley." },
      { property: "og:title", content: "Commercial Snow Removal — Fraser Valley" },
      { property: "og:description", content: "Contract and on-call snow removal for commercial lots, walkways and driveways across the Fraser Valley." },
      { property: "og:url", content: "/snow-removal" },
    ],
    links: [{ rel: "canonical", href: "/snow-removal" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero eyebrow="Snow Removal" title="Service" intro="Contract and on-call snow removal for commercial lots, walkways and driveways across the Fraser Valley." />
      <StubBody />
      <CtaStrip />
    </PageShell>
  );
}
