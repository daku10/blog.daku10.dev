import Link from "next/link";

export const Header = () => {
  return (
    <header>
      <Link href="/" className="text-3xl font-bold">
        blog.daku10.dev
      </Link>
    </header>
  );
};
