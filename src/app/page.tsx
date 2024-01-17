import Link from "next/link";
import { retrievePostSummaries } from "@/lib/api";

export default async function Page() {
  const postSummaries = await retrievePostSummaries();

  return (
    <div>
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
