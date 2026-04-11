/** @jsxImportSource preact */

import { useSignal, useSignalEffect } from "@preact/signals";
import { useSignalRef } from "@preact/signals/utils";

import { cn } from "@/lib/util";

type Props = {
  pathname: string;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

const MenuIcon = ({ open }: { open: boolean }) => {
  if (open) {
    return (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
};

const RssIcon = () => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      className="h-10 w-10 p-2 text-secondary hover:text-primary"
      viewBox="0 0 24 24"
    >
      <path d="M4 19a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <path d="M4 11a9 9 0 0 1 9 9" />
    </svg>
  );
};

const GitHubIcon = () => {
  return (
    <svg
      aria-hidden="true"
      className="h-10 w-10 p-2 text-secondary hover:text-primary"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.76 2.68 1.25 3.34.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.71 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.45.11-3.03 0 0 .97-.31 3.17 1.18a10.97 10.97 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.74.11 3.03.74.8 1.18 1.83 1.18 3.09 0 4.44-2.68 5.41-5.24 5.69.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.68.8.56A11.53 11.53 0 0 0 23.5 12.02C23.5 5.66 18.35.5 12 .5Z" />
    </svg>
  );
};

export const SideMenu = ({ pathname }: Props) => {
  const open = useSignal(false);
  const buttonRef = useSignalRef<HTMLButtonElement | null>(null);
  const panelRef = useSignalRef<HTMLDivElement | null>(null);
  const titleId = "side-menu-title";

  useSignalEffect(() => {
    if (!open.value) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;

    const handleKeyDown = (event: KeyboardEvent) => {
      const triggerButton = buttonRef.current;

      if (event.key === "Escape") {
        event.preventDefault();
        open.value = false;
        triggerButton?.focus();
        return;
      }

      if (event.key !== "Tab" || !panel) {
        return;
      }

      const currentFocusable = [
        ...panel.querySelectorAll<HTMLElement>(focusableSelector),
      ].filter((element) => {
        return !element.hasAttribute("disabled");
      });

      if (currentFocusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = currentFocusable[0];
      const last = currentFocusable[currentFocusable.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === triggerButton) {
        event.preventDefault();
        open.value = false;
        return;
      }

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        triggerButton?.focus();
        return;
      }

      if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        open.value = false;
        triggerButton?.focus();
        return;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const closeMenu = () => {
    open.value = false;
  };

  return (
    <>
      <button
        ref={buttonRef}
        aria-controls={titleId}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="p-2 text-secondary hover:text-primary aria-expanded:text-primary"
        onClick={() => {
          open.value = !open.value;
        }}
        type="button"
      >
        <MenuIcon open={open.value} />
        <span className="sr-only">Menu</span>
      </button>

      {open.value && (
        <>
          <button
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-invert-background/30"
            onClick={() => {
              open.value = false;
            }}
            tabIndex={-1}
            type="button"
          />
          <div
            ref={panelRef}
            aria-labelledby={titleId}
            aria-modal="true"
            className="fixed bottom-0 left-0 z-50 h-[calc(100vh-88px)] w-screen bg-background"
            role="dialog"
            tabIndex={-1}
          >
            <h2 id={titleId} className="sr-only">
              Navigation menu
            </h2>
            <div className="flex h-full flex-col justify-between">
              <nav>
                <ul className="grid gap-6 px-6 py-6">
                  <li>
                    <a
                      className={cn(
                        "text-lg text-secondary hover:text-primary hover:underline hover:underline-offset-8",
                        {
                          "text-primary underline underline-offset-8":
                            pathname.startsWith("/tags"),
                        },
                      )}
                      href="/tags"
                      onClick={closeMenu}
                    >
                      Tags
                    </a>
                  </li>
                  <li>
                    <a
                      className={cn(
                        "text-lg text-secondary hover:text-primary hover:underline hover:underline-offset-8",
                        {
                          "text-primary underline underline-offset-8":
                            pathname.startsWith("/about"),
                        },
                      )}
                      href="/about"
                      onClick={closeMenu}
                    >
                      About
                    </a>
                  </li>
                </ul>
              </nav>
              <div>
                <hr className="border-t" />
                <div className="flex px-6 py-2">
                  <a href="/feed.xml" rel="noopener" target="_blank">
                    <span className="text-secondary hover:text-primary">
                      <RssIcon />
                    </span>
                    <span className="sr-only">RSS</span>
                  </a>
                  <a
                    href="https://github.com/daku10/blog.daku10.dev"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="text-secondary hover:text-primary">
                      <GitHubIcon />
                    </span>
                    <span className="sr-only">GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
