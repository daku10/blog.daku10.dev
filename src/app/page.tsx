import { Link } from "@/components/Link";
import { TagLink } from "@/components/TagLink";
import { PostSummary, retrievePostSummaries } from "@/lib/api";

export default async function Page() {
  const postSummaries = await retrievePostSummaries();

  return (
    <div className="">
      <ul>
        {postSummaries.map((postSummary) => (
          <li key={postSummary.slug}>
            <PostSummary postSummary={postSummary} />
          </li>
        ))}
      </ul>
    </div>
  );
}

type Props = {
  postSummary: PostSummary;
};

const PostSummary = ({ postSummary }: Props) => {
  return (
    <article>
      <div>{postSummary.publishedAt}</div>
      <h3 className="mt-2 inline-block h-7 border-primary text-xl hover:border-b">
        <Link href={`/posts/${postSummary.slug}`}>{postSummary.title}</Link>
      </h3>
      <ul className="mt-2 flex gap-2">
        {postSummary.tags.map((tag) => (
          <li key={tag}>
            <TagLink tag={tag} />
          </li>
        ))}
      </ul>
    </article>
  );
};
