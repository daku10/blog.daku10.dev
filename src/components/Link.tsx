import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function Link({ ...rest }: Props) {
  return <a {...rest} />;
}
