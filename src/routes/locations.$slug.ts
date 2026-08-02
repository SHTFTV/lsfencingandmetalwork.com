import { createFileRoute } from "@tanstack/react-router";
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
import kelowna from "@/locations/chain-link-fencing-kelowna-bc.html?raw";
import kamloops from "@/locations/chain-link-fencing-kamloops-bc.html?raw";
import princeGeorge from "@/locations/chain-link-fencing-prince-george-bc.html?raw";
import penticton from "@/locations/chain-link-fencing-penticton-bc.html?raw";
import castlegar from "@/locations/chain-link-fencing-castlegar-bc.html?raw";
import vernon from "@/locations/chain-link-fencing-vernon-bc.html?raw";
import cranbrook from "@/locations/chain-link-fencing-cranbrook-bc.html?raw";
import williamsLake from "@/locations/chain-link-fencing-williams-lake-bc.html?raw";

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
  "kelowna-bc": kelowna,
  "kamloops-bc": kamloops,
  "prince-george-bc": princeGeorge,
  "penticton-bc": penticton,
  "castlegar-bc": castlegar,
  "vernon-bc": vernon,
  "cranbrook-bc": cranbrook,
  "williams-lake-bc": williamsLake,
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
});
