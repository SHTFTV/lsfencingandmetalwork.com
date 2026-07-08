import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy WordPress URL — permanent redirect to the consolidated route.
export const Route = createFileRoute("/differences-between-chain-link-fence-and-wooden-fence")({
  beforeLoad: () => {
    throw redirect({ to: "/blog/differences-between-chain-link-fence-and-wooden-fence", statusCode: 301 });
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: () => null,
});
