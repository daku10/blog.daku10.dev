import { retrievePost, retrievePostSummaries } from "@/lib/api";
import { processor } from "@/lib/processor";

export default async function Page({ params }: { params: { slug: string } }) {
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
