import { useSignal, useSignalEffect } from "@preact/signals";
import { useSignalRef } from "@preact/signals/utils";

import { Icon } from "@/components/Icon";
import { cn } from "@/lib/util";

type Props = {
  pathname: string;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

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
        <Icon className="h-6 w-6" type={open.value ? "cancel" : "menu"} />
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
                      <Icon className="h-10 w-10 p-2" type="rss" />
                    </span>
                    <span className="sr-only">RSS</span>
                  </a>
                  <a
                    href="https://github.com/daku10/blog.daku10.dev"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="text-secondary hover:text-primary">
                      <Icon className="h-10 w-10 p-2" type="github" />
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
