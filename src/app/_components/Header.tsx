import { Link } from "@/components/Link";

export const Header = () => {
  return (
    <header>
      <div className="max-w-7xl mx-auto py-8">
        <nav className="flex items-center">
          <Link href="/" className="text-3xl font-bold">
            blog.daku10.dev
          </Link>
          <ul className="flex">
            <li>
              <Link href="/tags">Tags</Link>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
