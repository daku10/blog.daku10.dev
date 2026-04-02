import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";

import { Icon } from "@/components/Icon";
import { Link } from "@/components/Link";
import { cn } from "@/lib/util";

type Props = {
  pathname: string;
};

export const SideMenu = ({ pathname }: Props) => {
  return (
    <Popover>
      {({ open, close }) => (
        <>
          <PopoverButton as={Fragment}>
            <button
              className="p-2 text-secondary hover:text-primary aria-expanded:text-primary"
              type="button"
            >
              {!open && <Icon type="menu" className="h-6 w-6" />}
              {open && <Icon type="cancel" className="h-6 w-6" />}
              <span className="sr-only">Menu</span>
            </button>
          </PopoverButton>
          <PopoverBackdrop className="fixed inset-0 bg-invert-background/30" />

          <Transition as={Fragment}>
            <PopoverPanel>
              <div className="fixed bottom-0 left-0 h-[calc(100vh-88px)] w-screen bg-background">
                <div className="flex h-full flex-col justify-between">
                  <nav>
                    <ul className="grid gap-6 px-6 py-6">
                      <li>
                        <Link
                          href="/tags"
                          onClick={() => {
                            close();
                          }}
                          className={cn(
                            "text-lg text-secondary hover:text-primary hover:underline hover:underline-offset-8",
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
                          onClick={() => {
                            close();
                          }}
                          className={cn(
                            "text-lg text-secondary hover:text-primary hover:underline hover:underline-offset-8",
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
                  <div>
                    <hr className="border-t" />
                    <div className="flex px-6 py-2">
                      <Link href="/feed.xml" target="_blank" rel="noopener">
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
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
