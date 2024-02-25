import { IconMenu2, IconX, IconRefresh, IconRss } from "@tabler/icons-react";
import {
  IconSun,
  IconMoon,
  IconSunMoon,
  IconCheck,
  IconPencil,
} from "@tabler/icons-react";
import { siZenn, siGithub, siX } from "simple-icons";

const icons = [
  "sun",
  "moon",
  "sun-moon",
  "check",
  "pencil",
  "refresh",
  "rss",
  "menu",
  "cancel"
] as const;
const serviceIcons = ["zenn", "github", "x"] as const;

type Icon = (typeof icons)[number] | (typeof serviceIcons)[number];

type Props = {
  type: Icon;
  className?: string;
};

const isIcons = (type: unknown): type is (typeof icons)[number] => {
  return icons.includes(type as (typeof icons)[number]);
};

export const Icon = ({ type, className }: Props) => {
  if (isIcons(type)) {
    switch (type) {
      case "sun":
        return <IconSun className={className} />;
      case "moon":
        return <IconMoon className={className} />;
      case "sun-moon":
        return <IconSunMoon className={className} />;
      case "check":
        return <IconCheck className={className} />;
      case "pencil":
        return <IconPencil className={className} />;
      case "refresh":
        return <IconRefresh className={className} />;
      case "rss":
        return <IconRss className={className} />;
      case "menu":
        return <IconMenu2 className={className} />;
        case "cancel":
          return <IconX className={className} />;
    }
  }
  switch (type) {
    case "zenn":
      return (
        <svg fill="currentColor" viewBox="0 0 24 24" className={className}>
          <path d={siZenn.path} />
        </svg>
      );
    case "github":
      return (
        <svg fill="currentColor" viewBox="0 0 24 24" className={className}>
          <path d={siGithub.path} />
        </svg>
      );
    case "x":
      return (
        <svg fill="currentColor" viewBox="0 0 24 24" className={className}>
          <path d={siX.path} />
        </svg>
      );
  }
};
