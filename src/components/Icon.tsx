import { IconSun, IconMoon, IconSunMoon, IconCheck } from "@tabler/icons-react";
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
        return <IconSun className={className} />;
      case "moon":
        return <IconMoon className={className} />;
      case "sun-moon":
        return <IconSunMoon className={className} />;
      case "check":
        return <IconCheck className={className} />;
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
