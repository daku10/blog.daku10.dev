import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { siZenn } from "simple-icons";

const icons = ["sun", "moon"] as const;
const serviceIcons = ["zenn"] as const;

type Icon = (typeof icons)[number] | (typeof serviceIcons)[number];

type Props = {
  type: Icon;
  className?: string;
};

export const Icon = ({ type, className }: Props) => {
  if (type === "sun" || type === "moon") {
    return type === "sun" ? (
      <SunIcon className={className} />
    ) : (
      <MoonIcon className={className} />
    );
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
