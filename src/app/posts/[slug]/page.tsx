import type { ResolvingMetadata } from "next";
import { Icon } from "@/components/Icon";
import { TagLink } from "@/components/TagLink";
import { retrievePost, retrievePostSummaries } from "@/lib/api";
import { processor } from "@/lib/processor";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  props: Props,
  _parent: ResolvingMetadata,
) {
  const params = await props.params;
  const post = await retrievePost(params.slug);
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  const { slug } = params;
  const post = await retrievePost(slug);
  const processedContent = await processor.process({
    data: {
      slug,
    },
    value: post.content,
  });

  return (
    <div className="md:mx-36">
      <h1 className="text-lg font-bold text-heading md:text-3xl">
        {post.title}
      </h1>
      <p className="mt-4 text-text">{post.description}</p>
      <div className="mt-4 flex gap-4 text-text">
        <div className="flex items-center gap-2">
          <Icon type="pencil" className="h-4 w-4" />
          <time dateTime={post.publishedAt}>{post.publishedAt}</time>
        </div>
        {post.updatedAt && post.publishedAt !== post.updatedAt && (
          <div className="flex items-center gap-2">
            <Icon type="refresh" className="h-4 w-4" />
            <time dateTime={post.updatedAt}>{post.updatedAt}</time>
          </div>
        )}
      </div>

      <ul className="mt-4 flex gap-4">
        {post.tags.map((tag) => (
          <li key={tag}>
            <TagLink tag={tag} />
          </li>
        ))}
      </ul>

      <article className="prose prose-sm mt-8 max-w-none prose-gray md:prose-base dark:prose-invert">
        {processedContent.result}
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return retrievePostSummaries().then((posts) => {
    return posts.map((post) => {
      return {
        slug: post.slug,
      };
    });
  });
}
