import { getCollection, getEntry, type CollectionEntry } from "astro:content";

import { TagLabel, Tags } from "./const";
import type { Tag } from "./const";

type PostMetadata = CollectionEntry<"posts">["data"];

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
  return (await getCollection("posts"))
    .map((post) => ({
      slug: post.id,
      ...post.data,
    }))
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
  const post = await getEntry("posts", slug);

  if (!post || !post.data.published) {
    throw new Error("Not found");
  }

  return {
    slug,
    content: post.body ?? "",
    ...post.data,
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
