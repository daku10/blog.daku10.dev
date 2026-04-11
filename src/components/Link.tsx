import type { ComponentChildren, JSX } from "preact";

type Props = {
  href: string;
  children: ComponentChildren;
} & JSX.IntrinsicElements["a"];

export function Link({ ...rest }: Props) {
  return <a {...rest} />;
}
