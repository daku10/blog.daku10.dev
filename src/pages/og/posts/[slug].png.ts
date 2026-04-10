import type { APIRoute } from "astro";

import { retrievePost, retrievePostSummaries } from "@/lib/api";
import { renderOgImage } from "@/lib/og";

export const prerender = true;

export async function getStaticPaths() {
  const posts = await retrievePostSummaries();

  return posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
}

export const GET: APIRoute = async ({ params }) => {
  const slug = params["slug"];

  if (!slug) {
    return new Response("Not Found", {
      status: 404,
    });
  }

  const post = await retrievePost(slug);
  const png = await renderOgImage({
    tags: post.tags,
    title: post.title,
  });

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
