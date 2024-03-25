import { Link } from "./Link";
import { TagLabel, type Tag } from "@/lib/const";
import { cn } from "@/lib/util";

type Props = {
  tag: Tag;
  postCount?: number;
  className?: string;
};

export const TagLink = ({ tag, postCount, className }: Props) => {
  return (
    <Link
      className={cn(
        "text-secondary hover:border-secondary hover:text-primary hover:underline hover:underline-offset-4",
        className,
      )}
      href={`/tags/${tag}`}
    >{`# ${TagLabel[tag]}${postCount ? ` ${postCount.toString()}` : ""}`}</Link>
  );
};
