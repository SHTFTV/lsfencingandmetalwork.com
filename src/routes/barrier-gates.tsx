import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";

export const Route = createFileRoute("/barrier-gates")({
  head: () => ({
    meta: [
      { title: "Barrier Gates & Hand Rails — MMCD Spec BC" },
      { name: "description", content: "Galvanized pipe barrier gates, guard rails and MMCD-spec hand rails for municipal and commercial sites." },
      { property: "og:title", content: "Barrier Gates & Hand Rails — MMCD Spec BC" },
      { property: "og:description", content: "Galvanized pipe barrier gates, guard rails and MMCD-spec hand rails for municipal and commercial sites." },
      { property: "og:url", content: "/barrier-gates" },
    ],
    links: [{ rel: "canonical", href: "/barrier-gates" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero eyebrow="Barrier Gates & Hand Rails" title="Service" intro="Galvanized pipe barrier gates, guard rails and MMCD-spec hand rails for municipal and commercial sites." />
      <StubBody />
      <CtaStrip />
    </PageShell>
  );
}
