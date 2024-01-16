// import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { Moon, Sun, SunMoon } from "lucide-react";
import { siZenn } from "simple-icons";

const icons = ["sun", "moon", "sun-moon", "check"] as const;
const serviceIcons = ["zenn"] as const;

type Icon = (typeof icons)[number] | (typeof serviceIcons)[number];

type Props = {
  type: Icon;
  className?: string;
};

export const Icon = ({ type, className }: Props) => {
  if (
    type === "sun" ||
    type === "moon" ||
    type === "check" ||
    type === "sun-moon"
  ) {
    switch (type) {
      case "sun":
        return <Sun className={className} />;
      case "moon":
        return <Moon className={className} />;
      case "sun-moon":
        return <SunMoon className={className} />;
      case "check":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className={className}
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        );
    }
  }
  switch (type) {
    case "zenn":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className={className}
        >
          <path d={siZenn.path} />
        </svg>
      );
  }
};
