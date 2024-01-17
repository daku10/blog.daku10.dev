import { Link } from "@/components/Link";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { Inter } from "next/font/google";
import { Navigation } from "./Navigation";

const inter = Inter({ subsets: ["latin"] });

export const Header = () => {
  return (
    <header>
      <div className="mx-auto flex max-w-7xl items-center justify-between p-6">
        <Link
          href="/"
          className={`${inter.className} text-3xl font-extrabold antialiased`}
        >
          blog.daku10.dev
        </Link>
        <div className="flex items-center">
          <Navigation />
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};
