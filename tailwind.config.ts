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
      colors: {
        primary: "rgb(var(--primary))",
        secondary: "rgb(var(--secondary))",
        background: "rgb(var(--background))",
        invertbackground: "rgb(var(--invert-background))",
        heading: "rgb(var(--heading))",
        link: "rgb(var(--link))",
        text: "rgb(var(--text))",
      },
      typography: (theme: (s: string) => string) => ({
        DEFAULT: {
          css: {
            code: {
              backgroundColor: "rgb(var(--code-background))",
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
              color: "rgb(var(--link))",
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
  darkMode: "class",
};
export default config;
