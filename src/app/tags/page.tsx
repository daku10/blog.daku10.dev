import { TagLink } from "@/components/TagLink";
import { retrieveTagWithPostCounts } from "@/lib/api";

export const metadata = {
  title: "タグ一覧",
  description: "タグ一覧です。",
};

export default async function Page() {
  const tags = await retrieveTagWithPostCounts();

  return (
    <div>
      <h2 className="text-xl text-primary">タグ一覧</h2>
      <ul className="mt-8 flex flex-col gap-2">
        {tags.map((tag) => (
          <li key={tag.slug}>
            <TagLink
              tag={tag.slug}
              postCount={tag.postCount}
              className="text-primary"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
