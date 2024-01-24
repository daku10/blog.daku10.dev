import { TagLabel, type Tag } from "@/lib/const";
import { Link } from "./Link";
import { cn } from "@/lib/util";

type Props = {
  tag: Tag;
  className?: string;
};

export const TagLink = ({ tag, className }: Props) => {
  return (
    <Link
      className={cn(
        "text-secondary hover:border-secondary hover:text-primary hover:underline hover:underline-offset-4",
        className,
      )}
      href={`/tags/${tag}`}
    >{`# ${TagLabel[tag]}`}</Link>
  );
};
