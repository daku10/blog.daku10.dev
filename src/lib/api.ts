import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { Tag, Tags } from "@/generated/tags";
import { TagLabel } from "./const";
import * as v from "valibot";

const postMetadataSchema = v.object({
  title: v.string(),
  description: v.string(),
  tags: v.array(v.picklist(Tags), [v.minLength(1)]),
  publishedAt: v.string(),
  updatedAt: v.optional(v.string()),
});

type PostMetadata = {
  title: string;
  description: string;
  // TODO: tags should be non-empty array
  tags: Tag[];
  publishedAt: string;
  updatedAt?: string | undefined;
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
        const parsed = v.parse(postMetadataSchema, data);
        return {
          slug: fileName.replace(/\.md$/, ""),
          ...parsed,
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
  const parsed = v.parse(postMetadataSchema, data);
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
  return retrieveTags().filter((tag) => tag.slug === slug)[0];
};
