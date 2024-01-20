import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "The daku10 Blog",
  description: "daku10のブログです。Web開発に関する記事がメインです。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="bg-background transition-colors">
        <Providers>
          <div className="mx-auto max-w-7xl px-6">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
