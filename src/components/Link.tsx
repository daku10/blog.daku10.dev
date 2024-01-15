import { cn } from "@/lib/util";
import NextLink from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof NextLink> & {
  withUnderline?: boolean;
};

export const Link = ({ withUnderline, className, ...rest }: Props) => {
  return (
    <NextLink
      {...rest}
      className={cn(className, { underline: withUnderline })}
    />
  );
};
