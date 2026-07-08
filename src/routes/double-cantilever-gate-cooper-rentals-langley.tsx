import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy WordPress URL — permanent redirect to the consolidated route.
export const Route = createFileRoute("/double-cantilever-gate-cooper-rentals-langley")({
  beforeLoad: () => {
    throw redirect({ to: "/projects/cooper-rentals-langley", statusCode: 301 });
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: () => null,
});
