import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy URL — permanent redirect to the canonical route so indexing consolidates.
export const Route = createFileRoute("/residential-chain-link")({
  beforeLoad: () => {
    throw redirect({ to: "/residential-chain-link-fencing", statusCode: 301 });
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: () => null,
});
