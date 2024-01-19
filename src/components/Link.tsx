import NextLink from "next/link";
import type { ComponentProps } from "react";

type Props<T> = ComponentProps<typeof NextLink<T>>;

export function Link<T>({ ...rest }: Props<T>) {
  return <NextLink {...rest} />;
}
