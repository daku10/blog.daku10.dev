import { retrievePostSummaries } from "@/lib/api";
import type { MetadataRoute } from "next";

// TODO: can we create automatically?
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: "https://blog.daku10.dev",
      priority: 1,
      lastModified,
    },
  ];
  const posts = await retrievePostSummaries();

  posts.forEach((post) => {
    sitemap.push({
      url: `https://blog.daku10.dev/posts/${post.slug}`,
      priority: 0.7,
      lastModified: post.updatedAt ?? post.publishedAt,
    });
  });

  return sitemap;
}
