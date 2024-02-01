"use client";

import { Link } from "@/components/Link";
import { cn } from "@/lib/util";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex">
        <li>
          <Link
            href="/tags"
            className={cn(
              "px-4 text-lg text-secondary hover:text-primary hover:underline hover:underline-offset-8",
              {
                "text-primary underline underline-offset-8":
                  pathname.startsWith("/tags"),
              },
            )}
          >
            Tags
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={cn(
              "px-4 text-lg text-secondary hover:text-primary hover:underline hover:underline-offset-8",
              {
                "text-primary underline underline-offset-8":
                  pathname.startsWith("/about"),
              },
            )}
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};
