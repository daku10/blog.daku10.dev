import path from "path";
import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";
import Link from "next/link";

export default async function Page() {
  // TODO: extract method
  const postsDirectory = path.join(process.cwd(), "content");
  const fileNames = await readdir(postsDirectory);
  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(postsDirectory, fileName);
      const fileContents = await readFile(filePath, "utf8");
      const { data } = matter(fileContents);
      guardData(data);
      return {
        slug: fileName.replace(".md", ""),
        frontmatter: data,
      };
    })
  ).then((posts) =>
    posts.sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )
  );

  return (
    <div>
      <h1>My Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function guardData(data: any): asserts data is { title: string; date: string } {
  if (typeof data.title !== "string") {
    throw new Error("invalid data");
  }
}
