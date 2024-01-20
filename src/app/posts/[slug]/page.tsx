import { Link } from "@/components/Link";
import { retrievePost, retrievePostSummaries } from "@/lib/api";
import { TagLabel } from "@/lib/const";
import { processor } from "@/lib/processor";
import type { ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata,
) {
  const post = await retrievePost(params.slug);
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = params;
  const post = await retrievePost(slug);
  const processedContent = await processor.process(post.content);

  return (
    <div className="mx-8">
      <h1>{post.title}</h1>
      <ul>
        {post.tags.map((tag) => (
          <li key={tag}>
            <Link href={`/tags/${tag}`}>{TagLabel[tag]}</Link>
          </li>
        ))}
      </ul>
      <article className="prose dark:prose-invert prose-gray max-w-none">
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
