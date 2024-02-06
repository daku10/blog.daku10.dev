import type { ResolvingMetadata } from "next";
import { PostSummaryList } from "@/components/PostSummaryList";
import {
  retrievePostSummaries,
  retrieveTag,
  retrieveTagWithPostCounts,
} from "@/lib/api";

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
      <h2 className="text-xl text-primary">{`${tag.label}の記事一覧`}</h2>
      <PostSummaryList postSummaries={postSummaries} className="mt-8" />
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
