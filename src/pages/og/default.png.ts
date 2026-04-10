import type { APIRoute } from "astro";

import { renderOgImage } from "@/lib/og";

export const prerender = true;

export const GET: APIRoute = async () => {
  const png = await renderOgImage({
    tags: [],
    title: "The daku10 Blog",
  });

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
