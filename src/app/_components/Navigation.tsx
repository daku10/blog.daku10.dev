import { Link } from "@/components/Link";

export const Navigation = () => {
  return (
    <nav>
      <ul className="flex">
        <li>
          <Link href="/" className={"px-4 text-lg"}>
            Blog
          </Link>
          <Link href="/tags" className={"px-4 text-lg"}>
            Tags
          </Link>
          <Link href="/about" className="px-4 text-lg">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};
