import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Fragment, forwardRef, useEffect, useState } from "react";
import type { ComponentProps } from "react";

import { Icon } from "@/components/Icon";
import { cn } from "@/lib/util";

type Theme = "light" | "dark" | "system";

const storageKey = "theme";

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

export const ThemeToggleButton = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setThemeState] = useState<Theme>("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey);
    const nextTheme = isValidTheme(savedTheme) ? savedTheme : "system";

    setThemeState(nextTheme);
    applyTheme(nextTheme);
    setMounted(true);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (nextTheme === "system") {
        applyTheme("system");
      }
    };

    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
    };
  }, []);

  const setTheme = (nextTheme: Theme) => {
    localStorage.setItem(storageKey, nextTheme);
    applyTheme(nextTheme);
    setThemeState(nextTheme);
  };

  if (!mounted) {
    return <ThemeIconButton />;
  }

  return (
    <Menu as="div" className="relative">
      <MenuButton as={ThemeIconButton} />
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 transform scale-95"
        enterTo="opacity-100 transform scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 transform scale-100"
        leaveTo="opacity-0 transform scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 flex flex-col rounded-md border bg-background p-2 shadow-md ring-1 ring-black/5 focus:outline-hidden">
          <MenuItem>
            {({ focus }) => (
              <RadioItem
                active={focus}
                current={theme}
                value="light"
                onChange={setTheme}
              />
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <RadioItem
                active={focus}
                current={theme}
                value="dark"
                onChange={setTheme}
              />
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <RadioItem
                active={focus}
                current={theme}
                value="system"
                onChange={setTheme}
              />
            )}
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

const ThemeIconButton = forwardRef<HTMLButtonElement>((props, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className="cursor-pointer p-2 text-secondary hover:text-primary aria-expanded:text-primary"
      type="button"
    >
      <Icon type="sun" className="block h-6 w-6 dark:hidden" />
      <Icon type="moon" className="hidden h-6 w-6 dark:block" />
      <span className="sr-only">Toggle Theme</span>
    </button>
  );
});
ThemeIconButton.displayName = "ThemeIconButton";

type RadioItemProps = {
  active: boolean;
  current: Theme;
  value: Theme;
  onChange: (value: Theme) => void;
} & Omit<ComponentProps<"button">, "onChange">;

const RadioItem = forwardRef<HTMLButtonElement, RadioItemProps>(
  ({ current, value, onChange, active, ...rest }, ref) => {
    const type =
      value === "light" ? "sun" : value === "dark" ? "moon" : "sun-moon";
    const label =
      value === "light" ? "Light" : value === "dark" ? "Dark" : "System";

    return (
      <button
        {...rest}
        ref={ref}
        className={cn(
          "w-28 cursor-pointer py-1.5 text-secondary outline-hidden transition-colors select-none",
          { "text-primary": active || current === value },
        )}
        onClick={(e) => {
          rest.onClick?.(e);
          onChange(value);
        }}
        type="button"
      >
        <span className="flex w-full items-center">
          <Icon type={type} className="h-6 w-6" />
          <span className="ml-2">{label}</span>
          {current === value && (
            <span className="ml-auto">
              <Icon type="check" className="h-4 w-4" />
            </span>
          )}
        </span>
      </button>
    );
  },
);

RadioItem.displayName = "RadioItem";
