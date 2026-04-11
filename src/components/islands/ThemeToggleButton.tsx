/** @jsxImportSource preact */
import styles from "./ThemeToggleButton.module.css";

import { useSignal, useSignalEffect } from "@preact/signals";
import { useSignalRef } from "@preact/signals/utils";

import { cn } from "@/lib/util";

type Theme = "light" | "dark" | "system";

const storageKey = "theme";
const menuId = "theme-toggle-menu";
const themeOrder: Theme[] = ["light", "dark", "system"];

const isValidTheme = (theme: string | null | undefined): theme is Theme => {
  return theme === "light" || theme === "dark" || theme === "system";
};

const resolveSystemTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyTheme = (theme: Theme) => {
  const resolved = theme === "system" ? resolveSystemTheme() : theme;
  document.documentElement.classList.toggle("dark", resolved === "dark");
};

const ThemeIconButton = ({
  buttonRef,
}: {
  buttonRef?: preact.Ref<HTMLButtonElement>;
}) => {
  return (
    <button
      ref={buttonRef}
      aria-haspopup="menu"
      className={cn(
        "cursor-pointer p-2 text-secondary hover:text-primary aria-expanded:text-primary",
        styles["theme-menu-button"],
      )}
      popoverTarget={menuId}
      type="button"
    >
      <SunIcon className="block h-6 w-6 dark:hidden" />
      <MoonIcon className="hidden h-6 w-6 dark:block" />
      <span className="sr-only">Toggle Theme</span>
    </button>
  );
};

type RadioItemProps = {
  current: Theme;
  onChange: (value: Theme) => void;
  value: Theme;
};

const RadioItem = ({ current, onChange, value }: RadioItemProps) => {
  const type = value === "light" ? "sun" : value === "dark" ? "moon" : "system";
  const label =
    value === "light" ? "Light" : value === "dark" ? "Dark" : "System";

  return (
    <button
      className={cn(
        "w-28 cursor-pointer py-1.5 text-secondary transition-colors select-none",
        { "text-primary": current === value },
      )}
      onClick={() => {
        onChange(value);
      }}
      role="menuitemradio"
      type="button"
    >
      <span className="flex w-full items-center">
        {type === "sun" && <SunIcon className="h-6 w-6" />}
        {type === "moon" && <MoonIcon className="h-6 w-6" />}
        {type === "system" && <SunMoonIcon className="h-6 w-6" />}
        <span className="ml-2">{label}</span>
        {current === value && (
          <span className="ml-auto">
            <CheckIcon className="h-4 w-4" />
          </span>
        )}
      </span>
    </button>
  );
};

export const ThemeToggleButton = () => {
  const theme = useSignal<Theme>("system");
  const activeIndex = useSignal(2);
  const buttonRef = useSignalRef<HTMLButtonElement | null>(null);
  const menuRef = useSignalRef<HTMLDivElement | null>(null);

  useSignalEffect(() => {
    const savedTheme = localStorage.getItem(storageKey);
    const nextTheme = isValidTheme(savedTheme) ? savedTheme : "system";

    theme.value = nextTheme;
    activeIndex.value = Math.max(themeOrder.indexOf(nextTheme), 0);
    applyTheme(nextTheme);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (theme.value === "system") {
        applyTheme("system");
      }
    };

    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
    };
  });

  useSignalEffect(() => {
    const menu = menuRef.current;
    if (!menu) {
      return;
    }

    const onToggle = () => {
      if (!menu.matches(":popover-open")) {
        return;
      }
      const nextIndex = themeOrder.indexOf(theme.value);
      activeIndex.value = nextIndex >= 0 ? nextIndex : 0;
      const items = menu.querySelectorAll<HTMLButtonElement>(
        "[role='menuitemradio']",
      );
      items[activeIndex.value]?.focus();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!menu.matches(":popover-open")) {
        return;
      }
      const menuItems = menu.querySelectorAll<HTMLButtonElement>(
        "[role='menuitemradio']",
      );
      if (menuItems.length === 0) {
        return;
      }
      if (event.key === "Tab") {
        event.preventDefault();
        const direction = event.shiftKey ? -1 : 1;
        activeIndex.value =
          (activeIndex.value + direction + menuItems.length) % menuItems.length;
        menuItems[activeIndex.value]?.focus();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        activeIndex.value = (activeIndex.value + 1) % menuItems.length;
        menuItems[activeIndex.value]?.focus();
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        activeIndex.value =
          (activeIndex.value - 1 + menuItems.length) % menuItems.length;
        menuItems[activeIndex.value]?.focus();
      }
    };

    menu.addEventListener("toggle", onToggle);
    menu.addEventListener("keydown", onKeyDown);

    return () => {
      menu.removeEventListener("toggle", onToggle);
      menu.removeEventListener("keydown", onKeyDown);
    };
  });

  const setTheme = (nextTheme: Theme) => {
    localStorage.setItem(storageKey, nextTheme);
    applyTheme(nextTheme);
    theme.value = nextTheme;
    menuRef.current?.hidePopover();
    buttonRef.current?.focus();
  };

  return (
    <div>
      <ThemeIconButton buttonRef={buttonRef} />
      <div
        id={menuId}
        ref={menuRef}
        className={cn(
          "flex flex-col rounded-md border bg-background p-2 shadow-md ring-1 ring-black/5",
          styles["theme-menu"],
        )}
        popover="auto"
        role="menu"
      >
        <RadioItem current={theme.value} onChange={setTheme} value="light" />
        <RadioItem current={theme.value} onChange={setTheme} value="dark" />
        <RadioItem current={theme.value} onChange={setTheme} value="system" />
      </div>
    </div>
  );
};

const SunIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
};

const MoonIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M12 3a6 6 0 1 0 9 9a9 9 0 1 1 -9 -9" />
    </svg>
  );
};

const SunMoonIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M9.173 14.83a4 4 0 1 1 5.657 -5.657" />
      <path d="M11.294 12.707l.174 .247a7.5 7.5 0 0 0 8.845 2.492a9 9 0 0 1 -14.671 2.914" />
      <path d="M3 12h1" />
      <path d="M12 3v1" />
      <path d="M5.6 5.6l.7 .7" />
      <path d="M3 21l18 -18" />
    </svg>
  );
};

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
};
