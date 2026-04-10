import { readFileSync } from "fs";
import path from "path";

import type { Root } from "hast";
import { imageSize } from "image-size";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const detailsBlockPattern =
  /<details>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g;

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

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
          // TODO: not good to use sync API here
          const imageBuffer = readFileSync(
            path.join(
              process.cwd(),
              "public",
              "posts",
              file.data["slug"],
              fileName,
            ),
          );
          const dimensions = imageSize(imageBuffer);
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
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeExternalLinks, { target: "_blank", rel: ["noopener"] })
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings)
  .use(myRehypeRewriteImg)
  .use(rehypePrettyCode, {
    theme: "dark-plus",
  })
  .use(rehypeStringify);

type RenderMarkdownOptions = {
  content: string;
  slug: string;
};

export const renderMarkdown = async ({
  content,
  slug,
}: RenderMarkdownOptions): Promise<string> => {
  const detailsBlocks: string[] = [];
  const contentWithPlaceholders = content.replace(
    detailsBlockPattern,
    (_, summary: string, body: string) => {
      const placeholder = `@@DETAILS_BLOCK_${detailsBlocks.length.toString()}@@`;
      detailsBlocks.push(
        JSON.stringify({
          summary: summary.trim(),
          body: body.trim(),
        }),
      );
      return `\n\n${placeholder}\n\n`;
    },
  );

  let html = (
    await processor.process({
      data: {
        slug,
      },
      value: contentWithPlaceholders,
    })
  ).toString();

  for (const [index, serializedBlock] of detailsBlocks.entries()) {
    const { summary, body } = JSON.parse(serializedBlock) as {
      summary: string;
      body: string;
    };
    const bodyHtml = (
      await processor.process({
        data: {
          slug,
        },
        value: body,
      })
    ).toString();
    const detailsHtml = `<details><summary>${escapeHtml(summary)}</summary>${bodyHtml}</details>`;
    html = html.replace(
      `<p>@@DETAILS_BLOCK_${index.toString()}@@</p>`,
      detailsHtml,
    );
  }

  return html;
};
