import type { APIRoute } from "astro";
import { PUBLIC_APP_ENV } from "astro:env/client";

import { retrievePostSummaries, retrieveTagWithPostCounts } from "@/lib/api";
import { siteConfig } from "@/lib/site";

const renderUrl = (loc: string, lastmod?: string | Date, priority?: number) => {
  const lastmodValue =
    lastmod instanceof Date ? lastmod.toISOString() : lastmod;

  return `<url><loc>${loc}</loc>${
    lastmodValue ? `<lastmod>${lastmodValue}</lastmod>` : ""
  }${
    priority !== undefined ? `<priority>${priority.toString()}</priority>` : ""
  }</url>`;
};

export const GET: APIRoute = async () => {
  if (PUBLIC_APP_ENV !== "production") {
    return new Response(null, {
      status: 404,
    });
  }

  const posts = await retrievePostSummaries();
  const tags = await retrieveTagWithPostCounts();
  const now = new Date().toISOString();

  const urls = [
    renderUrl(siteConfig.url, now, 1),
    renderUrl(`${siteConfig.url}/about`, now, 0.6),
    renderUrl(`${siteConfig.url}/tags`, now, 0.7),
    ...tags.map((tag) =>
      renderUrl(`${siteConfig.url}/tags/${tag.slug}`, now, 0.6),
    ),
    ...posts.map((post) =>
      renderUrl(
        `${siteConfig.url}/posts/${post.slug}`,
        post.updatedAt ?? post.publishedAt,
        0.7,
      ),
    ),
  ].join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    },
  );
};
