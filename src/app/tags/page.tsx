import { retrieveTagWithPostCounts } from "@/lib/api";
import Link from "next/link";

export const metadata = {
  title: "タグ一覧",
  description: "タグ一覧です。",
};

export default async function Page() {
  const tags = await retrieveTagWithPostCounts();

  return (
    <div>
      <h1>タグ一覧</h1>
      <ul>
        {tags.map((tag) => (
          <li key={tag.slug}>
            <Link href={`/tags/${tag.slug}`}>
              {tag.label} {tag.postCount}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
