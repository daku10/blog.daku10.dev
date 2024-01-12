import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";
import path from "path";

type PostSummary = {
  slug: string;
  title: string;
  publishedAt: string;
  updatedAt?: string;
};

type Post = {
  content: string;
} & PostSummary;

export const retrievePostSummaries: () => Promise<PostSummary[]> = async () => {
  const postsDir = path.join(process.cwd(), "content");
  const fileNames = (await readdir(postsDir)).filter((fileName) =>
    fileName.endsWith(".md"),
  );

  return (
    await Promise.all(
      fileNames.map(async (fileName) => {
        const filePath = path.join(postsDir, fileName);
        const fileContent = await readFile(filePath, "utf-8");
        const { data } = matter(fileContent);
        guardData(data);
        return {
          slug: fileName.replace(/\.md$/, ""),
          ...data,
        };
      }),
    )
  ).sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
};

export const retrievePost: (slug: string) => Promise<Post> = async (slug) => {
  const filePath = path.join(process.cwd(), "content", `${slug}.md`);
  const fileContent = await readFile(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  guardData(data);
  return {
    slug,
    content,
    ...data,
  };
};

function guardData(
  data: unknown,
): asserts data is { title: string; publishedAt: string; updatedAt?: string } {
  if (typeof data !== "object" || data === null) {
    throw new Error("data is not an object");
  }
  if (!("title" in data)) {
    throw new Error("title is missing");
  }
  if (!("publishedAt" in data)) {
    throw new Error("publishedAt is missing");
  }
}
