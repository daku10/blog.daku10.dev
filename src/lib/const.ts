export const Tags = [
  "blog",
  "cloudflare",
  "frontend",
  "isucon",
  "nextjs",
] as const;

export type Tag = (typeof Tags)[number];

export const TagLabel = {
  blog: "ブログ",
  cloudflare: "Cloudflare",
  frontend: "フロントエンド",
  isucon: "ISUCON",
  nextjs: "Next.js",
} satisfies {
  [key in Tag]: string;
};
