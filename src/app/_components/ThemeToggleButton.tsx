"use client";

import { Icon } from "@/components/Icon";
import { useTheme } from "next-themes";
import { forwardRef, useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ThemeIconButton />;
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <ThemeIconButton />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        align="end"
        hideWhenDetached
        className="mt-2 p-2 border rounded-xl shadow-md"
      >
        <DropdownMenu.RadioGroup
          value={theme}
          onValueChange={setTheme}
          className="flex flex-col gap-2"
        >
          <RadioItem value="light" />
          <RadioItem value="dark" />
          <RadioItem value="system" />
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

const ThemeIconButton = forwardRef<HTMLButtonElement>((props, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className="p-2 outline-none focus-visible:ring-2 rounded-md hover:bg-accent hover:text-accent-foreground"
    >
      <Icon type="sun" className="w-6 h-6 block dark:hidden" />
      <Icon type="moon" className="w-6 h-6 hidden dark:block" />
    </button>
  );
});
ThemeIconButton.displayName = "ThemeIconButton";

type RadioItemProps = {
  value: "light" | "dark" | "system";
};

const RadioItem = ({ value }: RadioItemProps) => {
  const type =
    value === "light" ? "sun" : value === "dark" ? "moon" : "sun-moon";
  const label =
    value === "light" ? "Light" : value === "dark" ? "Dark" : "System";

  return (
    <DropdownMenu.RadioItem
      value={value}
      className="cursor-pointer select-none outline-none rounded-md transition-colors focus:bg-accent focus:text-accent-foreground"
    >
      <div className="flex items-center">
        <Icon type={type} className="w-6 h-6" />
        <span className="ml-2">{label}</span>
        <DropdownMenu.DropdownMenuItemIndicator>
          <Icon type="check" className="ml-2 w-4 h-4" />
        </DropdownMenu.DropdownMenuItemIndicator>
      </div>
    </DropdownMenu.RadioItem>
  );
};
