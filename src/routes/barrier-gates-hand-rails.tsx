import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy WordPress URL — permanent redirect to the consolidated route.
export const Route = createFileRoute("/barrier-gates-hand-rails")({
  beforeLoad: () => {
    throw redirect({ to: "/barrier-gates", statusCode: 301 });
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: () => null,
});
