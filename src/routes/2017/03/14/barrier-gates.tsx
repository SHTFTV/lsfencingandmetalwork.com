import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy WordPress URL — permanent redirect to the consolidated route.
export const Route = createFileRoute("/2017/03/14/barrier-gates")({
  beforeLoad: () => {
    throw redirect({ to: "/blog/benefits-of-barrier-gates", statusCode: 301 });
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: () => null,
});
