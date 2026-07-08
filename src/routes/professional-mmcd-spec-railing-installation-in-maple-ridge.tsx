import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy WordPress URL — permanent redirect to the consolidated route.
export const Route = createFileRoute("/professional-mmcd-spec-railing-installation-in-maple-ridge")({
  beforeLoad: () => {
    throw redirect({ to: "/projects/railing-installation-maple-ridge", statusCode: 301 });
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: () => null,
});
