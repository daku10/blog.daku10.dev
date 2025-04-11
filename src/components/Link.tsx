import NextLink from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  prefetch?: boolean;
};

export function Link({ ...rest }: Props) {
  return <NextLink {...rest} />;
}
