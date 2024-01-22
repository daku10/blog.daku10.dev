import { env } from "@/env.mjs";

export const GA_ID = env.NEXT_PUBLIC_GA_ID;
export const isEnabled = env.NEXT_PUBLIC_APP_ENV === "production";
export const pageview = (url: string) => {
  if (!isEnabled) return;
  window.gtag("config", GA_ID, {
    page_path: url,
  });
};
