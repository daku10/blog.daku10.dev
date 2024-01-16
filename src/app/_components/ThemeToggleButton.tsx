"use client";

import { Icon } from "@/components/Icon";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <>
        <Icon type="sun" className="w-6 h-6 block dark:hidden" />
        <Icon type="moon" className="w-6 h-6 hidden dark:block" />
      </>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button>
          <Icon type="sun" className="w-6 h-6 block dark:hidden" />
          <Icon type="moon" className="w-6 h-6 hidden dark:block" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.RadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenu.RadioItem value="light">
            <Icon type="sun" className="w-6 h-6" />
            <DropdownMenu.DropdownMenuItemIndicator>
              <Icon type="check" className="w-4 h-4" />
            </DropdownMenu.DropdownMenuItemIndicator>
          </DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="dark">
            <Icon type="moon" className="w-6 h-6" />
            <DropdownMenu.DropdownMenuItemIndicator>
              <Icon type="check" className="w-4 h-4" />
            </DropdownMenu.DropdownMenuItemIndicator>
          </DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="system">
            <Icon type="sun-moon" className="w-6 h-6" />
            <DropdownMenu.DropdownMenuItemIndicator>
              <Icon type="check" className="w-4 h-4" />
            </DropdownMenu.DropdownMenuItemIndicator>
          </DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
