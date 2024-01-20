---
title: Blog始めました
description: "Blog始めました。Next.jsのApp Router + Static Exportベースで作られており、Cloudflare Pagesでデプロイされています。ブログを始めたモチベーションや使用した技術スタックについて書いています。"
tags: ["nextjs", "frontend", "blog", "cloudflare"]
published: true
publishedAt: "2023-06-24"
---

## はじめに

私は[Zennに時々書いていた](https://zenn.dev/daku10)のですが、この度専用のブログを作ることにしました。色々と理由はあるのですが、主な理由はこんなところでしょうか。

- 自分が学んだことをアウトプットする場所が欲しい
- 他の人の記事で勉強になることが多いので、自分もそういう記事を書きたい
- 完全な技術記事だけでなく、雑記も書きたい
- **一度作ってみたかった**

住み分けとしては、人に広めたい技術記事はZennに書き、それ以外はこちらに書こうと思っています。

## 技術スタック

今回は以下のような技術スタックでブログを作りました。

### Next.js

単にブログを作るという技術選定では、様々な選択肢がありますが、今回はNext.jsのApp Router + Static Exportベースで作りました。フロントエンドの界隈では、今後数年間はNext.jsが主流になると考えていること、主軸に据えられるApp Routerに触ってみたかったことからこの選択になりました。現状Static Exportで十分なので、Next.jsの機能を十分に活用できていませんが、現時点でもReact Server Componentsが動作する、Client Componentとの使い分けが必要など、色々と新しい機能で遊べています。

### Tailwind CSS

デザイン周りは得意ではないので、[shadcn/ui](https://ui.shadcn.com/)や[v0](https://v0.dev/)を始めとする、Tailwind CSSの利用を前提としたエコシステムに乗るために、Tailwind CSSを採用しました。

### Cloudflare



## おわりに

このブログを支える細かい技術は、今後の記事で紹介していく予定です。以下のような記事を予定しています。

- ディレクトリ構成
- ダークモード対応
- 記事のスタイリング

また、今後このブログに以下のような機能を追加していく予定です。

- 検索機能
- 目次(ToC)

ブログのソースコードは[GitHub](https://github.com/daku10/blog.daku10.dev)で公開しています。また、記事の内容に誤りがあった場合は、[GitHubのIssue](https://github.com/daku10/blog.daku10.dev/issues)や[X](https://twitter.com/daku10_dev)で教えていただけると嬉しいです。

