export const Tags = [
  "blog",
  "cloudflare",
  "frontend",
  "isucon",
  "nextjs",
  "tailwindcss",
  "linux",
  "wsl2",
  "web-speed-hackathon",
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
  "web-speed-hackathon": "Web Speed Hackathon",
} satisfies Record<Tag, string>;
