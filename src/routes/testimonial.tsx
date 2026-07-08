import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";

export const Route = createFileRoute("/testimonial")({
  head: () => ({
    meta: [
      { title: "Testimonials — LS Fencing Customer Reviews" },
      { name: "description", content: "What Fraser Valley homeowners, builders and property managers say about working with LS Fencing." },
      { property: "og:title", content: "Testimonials — LS Fencing Customer Reviews" },
      { property: "og:description", content: "What Fraser Valley homeowners, builders and property managers say about working with LS Fencing." },
      { property: "og:url", content: "/testimonial" },
    ],
    links: [{ rel: "canonical", href: "/testimonial" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero eyebrow="Testimonials" title="What Clients Say" intro="What Fraser Valley homeowners, builders and property managers say about working with LS Fencing." />
      <StubBody />
      <CtaStrip />
    </PageShell>
  );
}
