import "./styles/globals.css";
import { Suspense } from "react";
import { Analytics } from "./_components/Analytics";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { Providers } from "./providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "The daku10 Blog",
    template: "%s | The daku10 Blog",
  },
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
        <Suspense>
          <Analytics />
        </Suspense>
        <Providers>
          <div className="grid-cols1 mx-auto grid min-h-svh max-w-7xl grid-rows-[auto_1fr_auto] px-6">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
