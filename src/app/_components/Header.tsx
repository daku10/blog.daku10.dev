import { Open_Sans } from "next/font/google";
import { Navigation } from "./Navigation";
import { SideMenu } from "./SideMenu";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { Icon } from "@/components/Icon";
import { Link } from "@/components/Link";

const titleFont = Open_Sans({ subsets: ["latin"], weight: ["400"] });

export const Header = () => {
  return (
    <header className="py-6 md:py-12">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className={`${titleFont.className} text-xl font-semibold antialiased md:text-3xl`}
        >
          blog.daku10.dev
        </Link>
        {/* -mr-2 is icon's right padding, too ugly */}
        <div className="-mr-2 flex items-center">
          <div className="hidden md:block">
            <Navigation />
          </div>
          <div className="ml-8 flex items-center">
            <div className="md:hidden">
              <SideMenu />
            </div>
            <ThemeToggleButton />
            <Link
              className="hidden md:block"
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
              className="hidden md:block"
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
