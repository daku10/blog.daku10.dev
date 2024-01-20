import { Link } from "@/components/Link";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { Inter } from "next/font/google";
import { Navigation } from "./Navigation";
import { Icon } from "@/components/Icon";

const inter = Inter({ subsets: ["latin"] });

export const Header = () => {
  return (
    <header className="py-6">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className={`${inter.className} text-3xl font-extrabold antialiased`}
        >
          blog.daku10.dev
        </Link>
        <div className="flex items-center">
          <Navigation />
          <div className="ml-8 flex items-center">
            <ThemeToggleButton />
            <Link
              href="https://github.com/daku10/blog.daku10.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                type="github"
                className="text-secondary hover:text-primary h-8 w-8 p-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
