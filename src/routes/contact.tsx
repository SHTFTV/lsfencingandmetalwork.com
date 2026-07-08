import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip, StubBody } from "@/components/PageShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact LS Fencing & Metal Work — Free Quote" },
      { name: "description", content: "Call 604-808-7496 or request a same-day quote for fencing, gates or welding across the Fraser Valley & Lower Mainland." },
      { property: "og:title", content: "Contact LS Fencing & Metal Work — Free Quote" },
      { property: "og:description", content: "Call 604-808-7496 or request a same-day quote for fencing, gates or welding across the Fraser Valley & Lower Mainland." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero eyebrow="Contact" title="Get In Touch" intro="Call 604-808-7496 or request a same-day quote for fencing, gates or welding across the Fraser Valley & Lower Mainland." />
      <StubBody />
      <CtaStrip />
    </PageShell>
  );
}
