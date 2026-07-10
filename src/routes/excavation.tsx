import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy URL — permanent redirect to the canonical route so indexing consolidates.
export const Route = createFileRoute("/excavation")({
  beforeLoad: () => {
    throw redirect({ to: "/excavation-services", statusCode: 301 });
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: () => null,
});
