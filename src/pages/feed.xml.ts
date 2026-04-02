import type { APIRoute } from "astro";
import RSS from "rss";

import { retrievePostSummaries } from "@/lib/api";
import { siteConfig } from "@/lib/site";

export const GET: APIRoute = async () => {
  const feed = new RSS({
    title: "blog.daku10.dev",
    description: siteConfig.description,
    site_url: siteConfig.url,
    feed_url: `${siteConfig.url}/feed.xml`,
    language: siteConfig.lang,
  });

  const posts = await retrievePostSummaries();

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/posts/${post.slug}`,
      date: new Date(post.publishedAt),
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
