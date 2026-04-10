import { PUBLIC_SITE_URL } from "astro:env/client";

export const siteConfig = {
  url: PUBLIC_SITE_URL,
  title: "The daku10 Blog",
  description: "daku10のブログです。Web開発に関する記事がメインです。",
  author: "daku10",
  lang: "ja",
};

export const pageTitle = (title?: string) => {
  if (!title) {
    return siteConfig.title;
  }
  return `${title} | ${siteConfig.title}`;
};
