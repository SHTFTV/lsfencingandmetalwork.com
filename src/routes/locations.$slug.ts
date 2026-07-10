import { createFileRoute, notFound } from "@tanstack/react-router";
import abbotsford from "@/locations/chain-link-fencing-abbotsford-bc.html?raw";
import agassiz from "@/locations/chain-link-fencing-agassiz-bc.html?raw";
import aldergrove from "@/locations/chain-link-fencing-aldergrove-bc.html?raw";
import chilliwack from "@/locations/chain-link-fencing-chilliwack-bc.html?raw";
import harrison from "@/locations/chain-link-fencing-harrison-hot-springs-bc.html?raw";
import hope from "@/locations/chain-link-fencing-hope-bc.html?raw";
import langley from "@/locations/chain-link-fencing-langley-bc.html?raw";
import mapleRidge from "@/locations/chain-link-fencing-maple-ridge-bc.html?raw";
import pittMeadows from "@/locations/chain-link-fencing-pitt-meadows-bc.html?raw";
import surrey from "@/locations/chain-link-fencing-surrey-bc.html?raw";

const PAGES: Record<string, string> = {
  abbotsford,
  agassiz,
  aldergrove,
  chilliwack,
  "harrison-hot-springs": harrison,
  hope,
  langley,
  "maple-ridge": mapleRidge,
  "pitt-meadows": pittMeadows,
  surrey,
};

export const Route = createFileRoute("/locations/$slug")({
  server: {
    handlers: {
      GET: ({ params }) => {
        const html = PAGES[params.slug];
        if (!html) {
          return new Response("Not Found", { status: 404 });
        }
        return new Response(html, {
          headers: {
            "content-type": "text/html; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
  loader: () => {
    throw notFound();
  },
  component: () => null,
});
