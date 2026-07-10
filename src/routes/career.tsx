import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";

export const Route = createFileRoute("/career")({
  head: () => ({
    meta: [
      { title: "Careers — Join the LS Fencing Crew" },
      { name: "description", content: "We are hiring experienced fence installers, welders and equipment operators across the Fraser Valley." },
      { property: "og:title", content: "Careers — Join the LS Fencing Crew" },
      { property: "og:description", content: "We are hiring experienced fence installers, welders and equipment operators across the Fraser Valley." },
      { property: "og:url", content: "/career" },
    ],
    links: [{ rel: "canonical", href: "/career" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero eyebrow="Careers" title="We Are Hiring" intro="We are hiring experienced fence installers, welders and equipment operators across the Fraser Valley." />
      <section className="container-industrial pt-16 pb-0">
        <h2 className="text-3xl font-semibold tracking-tight">Open roles on the LS Fencing crew</h2>
      </section>
      <StubBody />
      <CtaStrip />
    </PageShell>
  );
}
