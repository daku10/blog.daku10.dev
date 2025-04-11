import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: ({ theme }: { theme: (s: string) => string }) => ({
        DEFAULT: {
          css: {
            code: {
              backgroundColor: "var(--code-background)",
              borderRadius: theme("borderRadius.DEFAULT"),
              paddingTop: theme("spacing.[0.5]"),
              paddingBottom: theme("spacing.[0.5]"),
              paddingLeft: theme("spacing.[1.5]"),
              paddingRight: theme("spacing.[1.5]"),
              fontWeight: "normal",
            },
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
            img: {
              marginLeft: "auto",
              marginRight: "auto",
            },
            a: {
              color: "var(--link)",
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
export default config;
