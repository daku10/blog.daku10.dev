import path from "path";
import sizeOf from "image-size";
import * as prod from "react/jsx-runtime";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeReact from "rehype-react";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import type { Root } from "hast";
import type { Plugin } from "unified";

// @ts-expect-error: the react types are missing.
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs };

const myRehypeRewriteImg: Plugin<[], Root> = () => {
  return (tree, file) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "img") {
        // For the moment, we add lazy loading to all images.
        node.properties["loading"] = "lazy";
        if (
          typeof node.properties["src"] === "string" &&
          node.properties["src"].startsWith("./") &&
          typeof file.data["slug"] === "string"
        ) {
          const fileName = node.properties["src"].substring(2);
          const dimensions = sizeOf(
            path.join(
              process.cwd(),
              "public",
              "posts",
              file.data["slug"],
              fileName,
            ),
          );
          node.properties["src"] = `./${file.data["slug"]}/${fileName}`;
          node.properties["width"] = dimensions.width;
          node.properties["height"] = dimensions.height;
        }
      }
    });
  };
};

export const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeExternalLinks, { target: "_blank", rel: ["noopener"] })
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings)
  .use(myRehypeRewriteImg)
  .use(rehypePrettyCode, {
    theme: "dark-plus",
  })
  .use(rehypeReact, production);
