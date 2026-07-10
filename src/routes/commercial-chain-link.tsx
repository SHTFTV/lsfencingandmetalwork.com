import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy URL — permanent redirect to the canonical route so indexing consolidates.
export const Route = createFileRoute("/commercial-chain-link")({
  beforeLoad: () => {
    throw redirect({ to: "/commercial-chain-link-fencing", statusCode: 301 });
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: () => null,
});
