import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { NonEmptyArray } from "./type";
import { Tag, Tags } from "@/generated/tags";
import { TagLabel } from "./const";

type PostMetadata = {
  title: string;
  description: string;
  tags: NonEmptyArray<Tag>;
  publishedAt: string;
  updatedAt?: string;
};

type PostSummary = {
  slug: string;
} & PostMetadata;

type Post = {
  content: string;
} & PostSummary;

type PostSearchParams = {
  tag?: Tag;
};

export const retrievePostSummaries: (
  params?: PostSearchParams,
) => Promise<PostSummary[]> = async (params) => {
  const postsDir = path.join(process.cwd(), "contents");
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
  )
    .filter((post) => {
      if (!params?.tag) {
        return true;
      }
      return post.tags.includes(params.tag);
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
};

export const retrievePost: (slug: string) => Promise<Post> = async (slug) => {
  const filePath = path.join(process.cwd(), "contents", `${slug}.md`);
  const fileContent = await readFile(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  assertData(data);
  return {
    slug,
    content,
    ...data,
  };
};

type TagWithLabel = {
  slug: Tag;
  label: string;
};

type TagWithPostCount = TagWithLabel & {
  postCount: number;
};

export const retrieveTagWithPostCounts: () => Promise<
  TagWithPostCount[]
> = async () => {
  const postSummaries = await retrievePostSummaries();
  const tags = new Map<Tag, TagWithPostCount>();
  postSummaries
    .flatMap((post) => post.tags)
    .forEach((tag) => {
      if (tags.has(tag)) {
        tags.get(tag)!.postCount++;
      } else {
        tags.set(tag, {
          slug: tag,
          label: TagLabel[tag],
          postCount: 1,
        });
      }
    });

  return [...tags.values()].sort((a, b) => {
    if (a.postCount === b.postCount) {
      return a.label.localeCompare(b.label, "ja");
    }
    return b.postCount - a.postCount;
  });
};

export const retrieveTags: () => readonly TagWithLabel[] = () => {
  return Tags.map((tag) => ({
    slug: tag,
    label: TagLabel[tag],
  }));
};

export const retrieveTag: (slug: string) => TagWithLabel | undefined = (
  slug,
) => {
  return retrieveTags().filter((tag) => tag.slug === slug)[0];
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
