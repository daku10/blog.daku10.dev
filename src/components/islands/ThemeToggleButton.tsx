import { useSignal, useSignalEffect } from "@preact/signals";

import { Icon } from "@/components/Icon";
import { cn } from "@/lib/util";

import styles from "./ThemeToggleButton.module.css";

type Theme = "light" | "dark" | "system";

const storageKey = "theme";
const menuId = "theme-toggle-menu";

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

const ThemeIconButton = () => {
  return (
    <button
      aria-haspopup="menu"
      className={cn(
        "cursor-pointer p-2 text-secondary hover:text-primary aria-expanded:text-primary",
        styles["theme-menu-button"],
      )}
      popoverTarget={menuId}
      type="button"
    >
      <Icon className="block h-6 w-6 dark:hidden" type="sun" />
      <Icon className="hidden h-6 w-6 dark:block" type="moon" />
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
      popoverTarget={menuId}
      popoverTargetAction="hide"
    >
      <span className="flex w-full items-center">
        {type === "sun" && <Icon className="h-6 w-6" type="sun" />}
        {type === "moon" && <Icon className="h-6 w-6" type="moon" />}
        {type === "system" && <Icon className="h-6 w-6" type="sun-moon" />}
        <span className="ml-2">{label}</span>
        {current === value && (
          <span className="ml-auto">
            <Icon className="h-4 w-4" type="check" />
          </span>
        )}
      </span>
    </button>
  );
};

export const ThemeToggleButton = () => {
  const theme = useSignal<Theme>("system");

  useSignalEffect(() => {
    const savedTheme = localStorage.getItem(storageKey);
    const nextTheme = isValidTheme(savedTheme) ? savedTheme : "system";

    theme.value = nextTheme;
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

  const setTheme = (nextTheme: Theme) => {
    localStorage.setItem(storageKey, nextTheme);
    applyTheme(nextTheme);
    theme.value = nextTheme;
  };

  return (
    <div>
      <ThemeIconButton />
      <div
        id={menuId}
        className={cn(
          "rounded-md border bg-background p-3 shadow-md ring-1 ring-black/5",
          styles["theme-menu"],
        )}
        popover="auto"
        role="menu"
      >
        <div className="flex flex-col">
          <RadioItem current={theme.value} onChange={setTheme} value="light" />
          <RadioItem current={theme.value} onChange={setTheme} value="dark" />
          <RadioItem current={theme.value} onChange={setTheme} value="system" />
        </div>
      </div>
    </div>
  );
};
