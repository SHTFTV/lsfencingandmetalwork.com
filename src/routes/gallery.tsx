import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Project Gallery — Fences, Gates & Metal Work" },
      { name: "description", content: "Photos of chain link, cedar, ornamental fencing, custom gates and welding jobs across the Fraser Valley." },
      { property: "og:title", content: "Project Gallery — Fences, Gates & Metal Work" },
      { property: "og:description", content: "Photos of chain link, cedar, ornamental fencing, custom gates and welding jobs across the Fraser Valley." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero eyebrow="Gallery" title="Proof of Work" intro="Photos of chain link, cedar, ornamental fencing, custom gates and welding jobs across the Fraser Valley." />
      <StubBody />
      <CtaStrip />
    </PageShell>
  );
}
