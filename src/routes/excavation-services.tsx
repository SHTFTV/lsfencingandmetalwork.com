import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";

export const Route = createFileRoute("/excavation-services")({
  head: () => ({
    meta: [
      { title: "Excavation Services — Mini Excavator BC" },
      { name: "description", content: "Kubota mini-excavator work for fence post holes, trenching, grading and small site prep." },
      { property: "og:title", content: "Excavation Services — Mini Excavator BC" },
      { property: "og:description", content: "Kubota mini-excavator work for fence post holes, trenching, grading and small site prep." },
      { property: "og:url", content: "/excavation-services" },
    ],
    links: [{ rel: "canonical", href: "/excavation-services" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero eyebrow="Excavation Services" title="Service" intro="Kubota mini-excavator work for fence post holes, trenching, grading and small site prep." />
      <StubBody />
      <CtaStrip />
    </PageShell>
  );
}
