import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy WordPress URL — permanent redirect to the consolidated route.
export const Route = createFileRoute("/premium-6x24-galvanized-chain-link-cantilever-gates-in-chilliwack")({
  beforeLoad: () => {
    throw redirect({ to: "/projects/cantilever-gates-chilliwack", statusCode: 301 });
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: () => null,
});
