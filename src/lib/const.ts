export const Tags = [
  "blog",
  "cloudflare",
  "frontend",
  "isucon",
  "nextjs",
  "tailwindcss",
] as const;

export type Tag = (typeof Tags)[number];

export const TagLabel = {
  blog: "ブログ",
  cloudflare: "Cloudflare",
  frontend: "フロントエンド",
  isucon: "ISUCON",
  nextjs: "Next.js",
  tailwindcss: "Tailwind CSS",
} satisfies {
  [key in Tag]: string;
};
