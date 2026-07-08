import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy WordPress URL — permanent redirect to the consolidated route.
export const Route = createFileRoute("/best-fencing-options-and-their-qualities")({
  beforeLoad: () => {
    throw redirect({ to: "/blog/best-fencing-options-and-their-qualities", statusCode: 301 });
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: () => null,
});
