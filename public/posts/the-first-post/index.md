---
title: Blog始めました
description: "Blogを新しく始めました。Next.jsのApp Router + Static Exportベースで作られており、Cloudflare Pagesでデプロイされています。ブログを始めたモチベーションや使用した技術スタックについて書いています。"
tags: ["nextjs", "frontend", "blog", "cloudflare"]
visual:
  main: "./the-first-post/image.png"
published: true
publishedAt: "2024-01-21"
updatedAt: "2024-01-21"
---

## はじめに

はじめまして、daku10と申します。私は[Zenn](https://zenn.dev/daku10)に時々技術記事を書いていたのですが、この度専用のブログを作ることにしました。色々と理由はあるのですが、主な理由はこんなところでしょうか。

- 自分が学んだことをアウトプットする場所が欲しい
- 他の人の記事で勉強になることが多いので、自分もそういう記事を書きたい
- 完全な技術記事だけでなく、雑記も書きたい
- **一度作ってみたかった**

住み分けとしては、人に広めたい技術記事はZennに書き、それ以外はこちらに書こうと思っています。今回は初めての投稿ということで、使用した技術スタックの紹介をしたいと思います。

## 技術スタック

今回は以下のような技術スタックでブログを作りました。

### Next.js

単にブログを作る際の技術選定では、様々な選択肢がありますが、今回はNext.jsのApp Router + Static Exportベースで作りました。フロントエンドの界隈では、今後数年間はNext.jsが主流になると考えていること、主軸に据えられるApp Routerに触ってみたかったことから、この選択を取りました。現状Static Exportで十分なのですが、現時点でもReact Server Componentsが動作する、状況によってClient Componentとの使い分けが必要など、色々と新しい機能で遊べています。

### コンテンツ管理

ヘッドレスCMS等で管理することも考えましたが、今回はMarkdownを直接リポジトリに置く方法を取りました。そして、このMarkdownですが、画像をどう扱うかなどを考えた結果、Next.jsが管理する`public`直下に置くことにしました。このような構成になっています。

![project structure](./image.webp)

Markdown内の画像を指す記法は、`![alt](./image.webp)`と書いています。この構成にすることで、Next.js上での表示も、Markdownのプレビュー上で画像の確認もできるようにしました。

このアイデアは、Dan Abramov氏の[Overreacted.io](https://overreacted.io/)を真似たものです。ただ、彼のサイトでは、Next.jsの`trailingSlash`を有効にすることで、Markdown中の`./image.png`をそのまま表示する仕組みになっていました。

ただ、私は`trailingSlash`を有効にするのを避けたかったので、MarkdownからReactコンポーネントに変換する際に、この画像のパスを変更するようにしました。MarkdownからReactコンポーネントへの変換は、[unified](https://unifiedjs.com/)を利用し、Markdown → mdast → hast → ReactElementに変換しているので、hastの操作として画像のパスを変更するようなプログラムを書きました。


```ts
// src/lib/processor.ts

const myRehypeRewriteImgPath: Plugin<[], Root> = () => {
  return (tree, file) => {
    visit(tree, "element", (node) => {
      // TypeScriptの型の都合上、少し冗長な書き方になっています
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
  .use(remarkRehype)
  .use(myRehypeRewriteImgPath)
  .use(rehypeReact, production);


// src/app/posts/[slug]/page.tsx

export default async function Page({ params }: Props) {
  const { slug } = params;
  const post = await retrievePost(slug);
  const processedContent = await processor.process({
    data: {
      slug,
    },
    value: post.content,
  });

  // ...
}
```

現在はこれに加えてwidthやheightの指定や、loading="lazy" の追加なども行っています。

### Tailwind CSS

デザイン周りは得意ではないので、既存のデザインのエコシステムに乗るために、Tailwind CSSを採用しました。当ブログのダークモード変更部分は[Headless UI](https://headlessui.com/)を使っているおり、その恩恵を受けています。また、Markdownから最終的に生成されるHTMLのスタイリングに[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)を利用しており、ある程度いい感じにスタイリングしてくれています。

### Cloudflare



## おわりに

このブログを支える細かい技術は、今後の記事で紹介できればと思います。また、今後このブログに以下のような機能を追加していく予定です。

- 目次(ToC)
- 検索機能

ブログのソースコードは[GitHub](https://github.com/daku10/blog.daku10.dev)で公開しています。また、記事の内容に誤りがあった場合は、[GitHubのIssue](https://github.com/daku10/blog.daku10.dev/issues)や[X](https://twitter.com/daku10_dev)で教えていただけると嬉しいです。

ブログは更新していくことが大事だと思うので、無理しない程度で更新していきたいと思います。
