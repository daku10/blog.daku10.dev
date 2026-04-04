import type { APIRoute } from "astro";
import { PUBLIC_APP_ENV } from "astro:env/client";

import { siteConfig } from "@/lib/site";

const isProduction = PUBLIC_APP_ENV === "production";

export const GET: APIRoute = () => {
  const body = isProduction
    ? `User-Agent: *\nAllow: /\n\nSitemap: ${siteConfig.url}/sitemap.xml\n`
    : "User-Agent: *\nDisallow: /\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
