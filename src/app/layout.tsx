import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Heaader/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "blog.daku10.dev",
  description: "daku10のブログです。Web開発に関する記事がメインです。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
