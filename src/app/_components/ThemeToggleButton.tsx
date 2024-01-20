"use client";

import { Icon } from "@/components/Icon";
import { useTheme } from "next-themes";
import type { ComponentProps } from "react";
import { Fragment, forwardRef, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { cn } from "@/lib/util";

type Theme = "light" | "dark" | "system";

const isValidTheme = (theme: string | undefined): theme is Theme => {
  return theme === "light" || theme === "dark" || theme === "system";
};

export const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isValidTheme(theme)) {
    return <ThemeIconButton />;
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button as={ThemeIconButton} />
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 transform scale-95"
        enterTo="opacity-100 transform scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 transform scale-100"
        leaveTo="opacity-0 transform scale-95"
      >
        <Menu.Items className="bg-background absolute right-0 mt-2 flex flex-col rounded-md border p-2 shadow-md ring-1 ring-black/5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <RadioItem
                active={active}
                current={theme}
                value="light"
                onChange={setTheme}
              />
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <RadioItem
                active={active}
                current={theme}
                value="dark"
                onChange={setTheme}
              />
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <RadioItem
                active={active}
                current={theme}
                value="system"
                onChange={setTheme}
              />
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const ThemeIconButton = forwardRef<HTMLButtonElement>((props, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className="text-secondary hover:text-primary p-2"
    >
      <Icon type="sun" className="block h-6 w-6 dark:hidden" />
      <Icon type="moon" className="hidden h-6 w-6 dark:block" />
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
        onClick={(e) => {
          rest.onClick?.(e);
          onChange(value);
        }}
        className={cn(
          "text-secondary w-28 cursor-pointer select-none py-1.5 outline-none transition-colors",
          { "text-primary": active || current === value },
        )}
      >
        <div className="flex items-center">
          <Icon type={type} className="h-6 w-6" />
          <span className="ml-2">{label}</span>
          <div className="ml-auto">
            {current === value && <Icon type="check" className="h-4 w-4" />}
          </div>
        </div>
      </button>
    );
  },
);

RadioItem.displayName = "RadioItem";
