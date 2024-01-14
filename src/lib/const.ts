import type { Tag } from "@/generated/tags";

export const TagLabel = {
  blog: "ブログ",
  cloudflare: "Cloudflare",
  frontend: "フロントエンド",
  isucon: "ISUCON",
  nextjs: "Next.js",
} satisfies {
  [key in Tag]: string;
};
