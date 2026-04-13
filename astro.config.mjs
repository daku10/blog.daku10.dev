import path from "node:path";

import preact from "@astrojs/preact";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders, envField } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export default defineConfig({
  site: "https://blog.daku10.dev",
  outDir: "./out",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  env: {
    schema: {
      PUBLIC_GA_ID: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
      PUBLIC_APP_ENV: envField.enum({
        context: "client",
        access: "public",
        optional: false,
        values: ["local", "preview", "production"],
      }),
      PUBLIC_SITE_URL: envField.string({
        context: "client",
        access: "public",
        optional: false,
        default: "https://blog.daku10.dev",
      }),
    },
  },
  integrations: [preact()],
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [rehypeExternalLinks, { rel: ["noopener"], target: "_blank" }],
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: "dark-plus",
        },
      ],
    ],
  },
  fonts: [
    {
      name: "Open Sans",
      cssVariable: "--font-brand",
      provider: fontProviders.google(),
      weights: [600, 700],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["Avenir Next", "Helvetica Neue", "Arial", "sans-serif"],
      display: "fallback",
      options: {
        experimental: {
          glyphs: ["blog.daku10ev"],
        },
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
});
