import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";

export const Route = createFileRoute("/welding-services")({
  head: () => ({
    meta: [
      { title: "Welding Services — Mobile Welder Fraser Valley" },
      { name: "description", content: "Mobile MIG, TIG and stick welding for repairs, fabrication and custom metal work across the Lower Mainland." },
      { property: "og:title", content: "Welding Services — Mobile Welder Fraser Valley" },
      { property: "og:description", content: "Mobile MIG, TIG and stick welding for repairs, fabrication and custom metal work across the Lower Mainland." },
      { property: "og:url", content: "/welding-services" },
    ],
    links: [{ rel: "canonical", href: "/welding-services" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero eyebrow="Welding Services" title="Service" intro="Mobile MIG, TIG and stick welding for repairs, fabrication and custom metal work across the Lower Mainland." />
      <StubBody />
      <CtaStrip />
    </PageShell>
  );
}
