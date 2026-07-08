import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy WordPress URL — permanent redirect to the consolidated route.
export const Route = createFileRoute("/10-high-galvanized-chain-link-fence-installed-for-heatherbrae-builders-surrey-bc")({
  beforeLoad: () => {
    throw redirect({ to: "/projects/heatherbrae-builders-surrey", statusCode: 301 });
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: () => null,
});
