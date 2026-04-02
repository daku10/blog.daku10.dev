import path from "node:path";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  site: "https://blog.daku10.dev",
  outDir: "./out",
  integrations: [react()],
  fonts: [
    {
      name: "Open Sans",
      cssVariable: "--font-brand",
      provider: fontProviders.google(),
      weights: [600, 700],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["Avenir Next", "Helvetica Neue", "Arial", "sans-serif"],
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
