import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy WordPress URL — permanent redirect to the consolidated route.
export const Route = createFileRoute("/chain-link-fences")({
  beforeLoad: () => {
    throw redirect({ to: "/chain-link-fencing", statusCode: 301 });
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: () => null,
});
