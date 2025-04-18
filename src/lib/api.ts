import { readFile, readdir } from "fs/promises";
import path from "path";
import matter from "gray-matter";
import * as v from "valibot";
import { TagLabel, Tags } from "./const";
import type { Tag } from "./const";

const postMetadataSchema = v.object({
  title: v.string(),
  description: v.string(),
  // this is a non-empty array for tags
  tags: v.tupleWithRest([v.picklist(Tags)], v.picklist(Tags)),
  published: v.boolean(),
  publishedAt: v.string(),
  updatedAt: v.optional(v.string()),
});

type NonEmptyArray<T> = [T, ...T[]];

type PostMetadata = {
  title: string;
  description: string;
  tags: NonEmptyArray<Tag>;
  published: boolean;
  publishedAt: string;
  updatedAt?: string | undefined;
};

export type PostSummary = {
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
  const postsDir = path.join(process.cwd(), "public", "posts");
  const fileNames = (await readdir(postsDir)).map((dir) => ({
    slug: dir,
    fileName: path.join(dir, "index.md"),
  }));

  return (
    await Promise.all(
      fileNames.map(async (fileName) => {
        const filePath = path.join(postsDir, fileName.fileName);
        const fileContent = await readFile(filePath, "utf-8");
        const { data } = matter(fileContent);
        const parsed = v.parse(postMetadataSchema, data);
        return {
          slug: fileName.slug,
          ...parsed,
        };
      }),
    )
  )
    .filter((post) => {
      if (!post.published) {
        return false;
      }
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
  const filePath = path.join(
    process.cwd(),
    "public",
    "posts",
    slug,
    "index.md",
  );
  const fileContent = await readFile(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const parsed = v.parse(postMetadataSchema, data);
  if (!parsed.published) {
    throw new Error("Not found");
  }
  return {
    slug,
    content,
    ...parsed,
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
  const tags = postSummaries
    .flatMap((post) => post.tags)
    .reduce((acc, tag) => {
      const t = acc.get(tag);
      if (t) {
        acc.set(tag, {
          ...t,
          postCount: t.postCount + 1,
        });
      } else {
        acc.set(tag, {
          slug: tag,
          label: TagLabel[tag],
          postCount: 1,
        });
      }
      return acc;
    }, new Map<Tag, TagWithPostCount>());

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
  return retrieveTags().find((tag) => tag.slug === slug);
};
