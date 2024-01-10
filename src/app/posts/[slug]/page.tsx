import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import * as prod from "react/jsx-runtime";
import path from "path";
import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";

// @ts-expect-error: the react types are missing.
const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs };

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeReact, production);

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), "content", `${slug}.md`);

  const fileContents = await readFile(filePath, "utf8");
  const { data, content } = matter(fileContents);
  guardData(data);
  const title = data.title;
  const processedContent = await processor.process(content);

  return (
    <div>
      <h1>{title}</h1>
      {processedContent.result}
    </div>
  );
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "content");
  const fileNames = await readdir(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      slug: fileName.replace(".md", ""),
    };
  });
}

function guardData(data: any): asserts data is { title: string; date: string } {
  if (typeof data.title !== "string") {
    throw new Error("invalid data");
  }
}
