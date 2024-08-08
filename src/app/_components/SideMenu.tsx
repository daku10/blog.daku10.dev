"use client";

import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { usePathname } from "next/navigation";
import { Fragment, forwardRef } from "react";
import { Icon } from "@/components/Icon";
import { Link } from "@/components/Link";
import { cn } from "@/lib/util";

export const SideMenu = () => {
  const pathname = usePathname();

  return (
    <Popover>
      {({ open, close }) => (
        <>
          <PopoverButton as={Fragment}>
            <button className="p-2 text-secondary hover:text-primary aria-expanded:text-primary">
              {!open && <Icon type="menu" className="h-6 w-6" />}
              {open && <Icon type="cancel" className="h-6 w-6" />}
              <span className="sr-only">Menu</span>
            </button>
          </PopoverButton>
          <PopoverBackdrop className="fixed inset-0 bg-invertbackground/30" />

          <Transition
            as={Fragment}
            // enter="transition ease-out duration-200"
            // enterFrom="transition-top-full"
            // enterTo="transition-top-0"
            // leave="transition ease-in duration-150"
            // leaveFrom="opacity-100"
            // leaveTo="opacity-0"
          >
            <PopoverPanel>
              <div className="fixed bottom-0 left-0 h-[calc(100vh-88px)] w-screen bg-background">
                <div className="flex h-full flex-col justify-between">
                  <nav>
                    <ul className="py- grid gap-6 px-6 py-6">
                      <li>
                        <Link
                          href="/tags"
                          onClick={close}
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
                          onClick={close}
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
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

const SideMenuButton = forwardRef<HTMLButtonElement>((props, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className="p-2 text-secondary hover:text-primary aria-expanded:text-primary"
    >
      <Icon
        type="menu"
        className="ui-open:hidden block h-6 w-6 aria-expanded:hidden"
      />
      <Icon type="cancel" className="hidden h-6 w-6 aria-expanded:block" />
      <span className="sr-only">Menu</span>
    </button>
  );
});
SideMenuButton.displayName = "SideMenuButton";
