import rehypeReact from "rehype-react";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { Plugin } from "unified";
import { unified } from "unified";
import * as prod from "react/jsx-runtime";
import { visit } from "unist-util-visit";
import type { Root } from "hast";

// @ts-expect-error: the react types are missing.
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs };

const myRehypeRewriteImgPath: Plugin<[], Root> = () => {
  return (tree, file) => {
    visit(tree, "element", (node) => {
      if (
        node.tagName === "img" &&
        typeof node.properties["src"] === "string" &&
        node.properties["src"].startsWith("./") &&
        typeof file.data["slug"] === "string"
      ) {
        node.properties["src"] = `./${file.data["slug"]}/${node.properties[
          "src"
        ].substring(2)}`;
      }
    });
  };
};

export const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings)
  .use(myRehypeRewriteImgPath)
  .use(rehypeReact, production);
