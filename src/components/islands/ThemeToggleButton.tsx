import styles from "./ThemeToggleButton.module.css";

import { useSignal, useSignalEffect } from "@preact/signals";
import { useSignalRef } from "@preact/signals/utils";

import { Icon } from "@/components/Icon";
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
  enabled?: boolean;
};

const RadioItem = ({ current, onChange, value, enabled }: RadioItemProps) => {
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
      tabIndex={enabled === false ? -1 : 0}
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
  const activeIndex = useSignal(2);
  const menuOpened = useSignal(false);
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
      const isOpen = menu.matches(":popover-open");
      menuOpened.value = isOpen;

      if (!isOpen) {
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
      menuOpened.value = false;
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
        <RadioItem
          current={theme.value}
          onChange={setTheme}
          value="light"
          enabled={menuOpened.value}
        />
        <RadioItem
          current={theme.value}
          onChange={setTheme}
          value="dark"
          enabled={menuOpened.value}
        />
        <RadioItem
          current={theme.value}
          onChange={setTheme}
          value="system"
          enabled={menuOpened.value}
        />
      </div>
    </div>
  );
};
