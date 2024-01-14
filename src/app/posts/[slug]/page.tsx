import { retrievePost, retrievePostSummaries } from "@/lib/api";
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
    <div>
      <h1>{post.title}</h1>
      {processedContent.result}
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
