import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";
import path from "path";

type PostMetadata = {
  title: string;
  description: string;
  tags: NonEmptyArray<string>;
  publishedAt: string;
  updatedAt?: string;
};

type PostSummary = {
  slug: string;
} & PostMetadata;

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
        assertData(data);
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
  assertData(data);
  return {
    slug,
    content,
    ...data,
  };
};

function assertData(data: unknown): asserts data is PostMetadata {
  if (typeof data !== "object" || data === null) {
    throw new Error("data is not an object");
  }
  if (!("title" in data)) {
    throw new Error("title is missing");
  }
  if (!("description" in data)) {
    throw new Error("description is missing");
  }
  if (!("tags" in data)) {
    throw new Error("tags is missing");
  }
  if (!(Array.isArray(data.tags) && data.tags.length > 0)) {
    throw new Error("tags is not an non empty array");
  }
  if (!("publishedAt" in data)) {
    throw new Error("publishedAt is missing");
  }
}
