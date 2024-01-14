import {
  retrievePostSummaries,
  retrieveTag,
  retrieveTagWithPostCounts,
} from "@/lib/api";
import type { ResolvingMetadata } from "next";
import Link from "next/link";

type Props = {
  params: { slug: string };
};

export function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata,
) {
  const tag = retrieveTag(params.slug);
  // TODO: 404
  if (!tag) {
    return {
      title: "タグ一覧",
      description: "タグ一覧です。",
    };
  }
  return {
    title: `${tag.label}の記事一覧`,
    description: `${tag.label}の記事一覧です。`,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = params;
  const tag = retrieveTag(slug);
  if (!tag) {
    // TODO: 404
    return <div>そのタグの記事は存在しません</div>;
  }
  const postSummaries = await retrievePostSummaries({
    tag: tag.slug,
  });
  return (
    <div>
      <h1>{}</h1>
      <Link href="/tags">タグ一覧</Link>
      <ul>
        {postSummaries.map((postSummary) => (
          <li key={postSummary.slug}>
            <Link href={`/posts/${postSummary.slug}`}>{postSummary.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function generateStaticParams() {
  return retrieveTagWithPostCounts().then((tags) => {
    return tags.map((tag) => {
      return {
        slug: tag.slug,
      };
    });
  });
}
