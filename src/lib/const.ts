export const Tags = [
  "blog",
  "cloudflare",
  "frontend",
  "isucon",
  "nextjs",
  "tailwindcss",
  "linux",
  "wsl2",
] as const;

export type Tag = (typeof Tags)[number];

export const TagLabel = {
  blog: "ブログ",
  cloudflare: "Cloudflare",
  frontend: "フロントエンド",
  isucon: "ISUCON",
  nextjs: "Next.js",
  tailwindcss: "Tailwind CSS",
  linux: "Linux",
  wsl2: "WSL2",
} satisfies Record<Tag, string>;
