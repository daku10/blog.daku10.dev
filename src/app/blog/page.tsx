import { Link } from "@/components/Link";
import { retrievePostSummaries } from "@/lib/api";

export default async function Page() {
  const postSummaries = await retrievePostSummaries();

  return (
    <div>
      <h1>Postをずらずらと出します</h1>
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
