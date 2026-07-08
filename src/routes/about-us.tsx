import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us — LS Fencing & Metal Work" },
      { name: "description", content: "Meet the Fraser Valley crew behind LS Fencing & Metal Work — 15+ years installing fences, gates and custom steel." },
      { property: "og:title", content: "About Us — LS Fencing & Metal Work" },
      { property: "og:description", content: "Meet the Fraser Valley crew behind LS Fencing & Metal Work — 15+ years installing fences, gates and custom steel." },
      { property: "og:url", content: "/about-us" },
    ],
    links: [{ rel: "canonical", href: "/about-us" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero eyebrow="Our Story" title="About LS Fencing" intro="Meet the Fraser Valley crew behind LS Fencing & Metal Work — 15+ years installing fences, gates and custom steel." />
      <StubBody />
      <CtaStrip />
    </PageShell>
  );
}
