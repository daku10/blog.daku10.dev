import { Open_Sans } from "next/font/google";
import { Navigation } from "./Navigation";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { Icon } from "@/components/Icon";
import { Link } from "@/components/Link";

const titleFont = Open_Sans({ subsets: ["latin"], weight: ["400"] });

export const Header = () => {
  return (
    <header className="py-12">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className={`${titleFont.className} text-3xl font-semibold antialiased`}
        >
          blog.daku10.dev
        </Link>
        <div className="flex items-center">
          <Navigation />
          <div className="ml-8 flex items-center">
            <ThemeToggleButton />
            <Link
              href="/feed.xml"
              target="_blank"
              rel="noopener"
              prefetch={false}
            >
              <Icon
                type="rss"
                className="h-10 w-10 p-2 text-secondary hover:text-primary"
              />
              <span className="sr-only">RSS</span>
            </Link>
            <Link
              href="https://github.com/daku10/blog.daku10.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                type="github"
                className="h-10 w-10 p-2 text-secondary hover:text-primary"
              />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
