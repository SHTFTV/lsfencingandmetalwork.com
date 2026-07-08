import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";

export const Route = createFileRoute("/ornamental-fencing")({
  head: () => ({
    meta: [
      { title: "Ornamental Iron Fencing — Steel Panel Fences" },
      { name: "description", content: "Powder-coated ornamental steel fences and gates with a clean architectural finish." },
      { property: "og:title", content: "Ornamental Iron Fencing — Steel Panel Fences" },
      { property: "og:description", content: "Powder-coated ornamental steel fences and gates with a clean architectural finish." },
      { property: "og:url", content: "/ornamental-fencing" },
    ],
    links: [{ rel: "canonical", href: "/ornamental-fencing" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero eyebrow="Ornamental Fencing" title="Service" intro="Powder-coated ornamental steel fences and gates with a clean architectural finish." />
      <StubBody />
      <CtaStrip />
    </PageShell>
  );
}
