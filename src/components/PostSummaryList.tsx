import { Link } from "./Link";
import { TagLink } from "./TagLink";
import type { PostSummary } from "@/lib/api";
import { cn } from "@/lib/util";

type Props = {
  postSummaries: PostSummary[];
  className?: string;
};

export const PostSummaryList = ({ postSummaries, className }: Props) => {
  return (
    <ul className={cn("grid gap-4", className)}>
      {postSummaries.map((postSummary) => (
        <li key={postSummary.slug}>
          <PostSummaryView postSummary={postSummary} />
        </li>
      ))}
    </ul>
  );
};

type PostSummaryViewProps = {
  postSummary: PostSummary;
};

const PostSummaryView = ({ postSummary }: PostSummaryViewProps) => {
  return (
    <article>
      <div>{postSummary.publishedAt}</div>
      <h3 className="mt-2 inline-block h-7 border-primary text-xl hover:border-b">
        <Link href={`/posts/${postSummary.slug}`}>{postSummary.title}</Link>
      </h3>
      <ul className="mt-2 flex gap-4">
        {postSummary.tags.map((tag) => (
          <li key={tag}>
            <TagLink tag={tag} />
          </li>
        ))}
      </ul>
    </article>
  );
};
