import { PostSummaryList } from "@/components/PostSummaryList";
import { retrievePostSummaries } from "@/lib/api";

export default async function Page() {
  const postSummaries = await retrievePostSummaries();

  return (
    <div className="">
      <h2 className="text-xl text-primary">最新記事</h2>
      <PostSummaryList postSummaries={postSummaries} className="mt-8" />
    </div>
  );
}
