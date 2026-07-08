import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy WordPress URL — permanent redirect to the consolidated route.
export const Route = createFileRoute("/why-you-should-consider-fencing-as-an-option")({
  beforeLoad: () => {
    throw redirect({ to: "/blog/why-you-should-consider-fencing-as-an-option", statusCode: 301 });
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: () => null,
});
