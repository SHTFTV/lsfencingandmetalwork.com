import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy URL — permanent redirect to the canonical route so indexing consolidates.
export const Route = createFileRoute("/chain-link")({
  beforeLoad: () => {
    throw redirect({ to: "/chain-link-fencing", statusCode: 301 });
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: () => null,
});
