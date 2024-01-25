import { PostSummaryView } from "@/components/PostSummaryView";
import { retrievePostSummaries } from "@/lib/api";

export default async function Page() {
  const postSummaries = await retrievePostSummaries();

  return (
    <div className="">
      <h2 className="text-xl text-primary">最新記事</h2>
      <ul className="mt-8">
        {postSummaries.map((postSummary) => (
          <li key={postSummary.slug}>
            <PostSummaryView postSummary={postSummary} />
          </li>
        ))}
      </ul>
    </div>
  );
}
