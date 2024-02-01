import RSS from "rss";
import { retrievePostSummaries } from "@/lib/api";

export async function GET() {
  const feed = new RSS({
    title: "blog.daku10.dev",
    description: "daku10のブログです。Web開発に関する記事がメインです。",
    site_url: "https://blog.daku10.dev",
    feed_url: "https://blog.daku10.dev/feed.xml",
    language: "ja",
  });

  const posts = await retrievePostSummaries();

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `https://blog.daku10.dev/posts/${post.slug}`,
      date: new Date(post.publishedAt),
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
