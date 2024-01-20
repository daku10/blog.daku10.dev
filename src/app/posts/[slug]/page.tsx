import { Icon } from "@/components/Icon";
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
  const processedContent = await processor.process({
    data: {
      slug,
    },
    value: post.content,
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-heading">{post.title}</h1>
      <div className="mt-4 flex gap-4 py-2 text-secondary">
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

      <ul className="mt-2 flex gap-4">
        {post.tags.map((tag) => (
          <li key={tag}>
            <Link
              className="block p-2 text-secondary hover:border-secondary hover:text-primary hover:underline  hover:underline-offset-4"
              href={`/tags/${tag}`}
            >{`# ${TagLabel[tag]}`}</Link>
          </li>
        ))}
      </ul>

      {/* <img
        src={post.visual.main}
        width={960}
        height={480}
        alt="main visual"
        className="mx-auto my-12 h-[360px] w-[720px] rounded-3xl object-cover"
      /> */}

      <article className="prose prose-gray mt-8 max-w-none dark:prose-invert">
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
