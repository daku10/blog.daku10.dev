import type { PostSummary } from "@/lib/api";
import { Link } from "./Link";
import { TagLink } from "./TagLink";

type Props = {
  postSummary: PostSummary;
};

export const PostSummaryView = ({ postSummary }: Props) => {
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
