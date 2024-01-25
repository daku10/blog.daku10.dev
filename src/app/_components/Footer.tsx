import { Link } from "../../components/Link";

export const Footer = () => {
  return (
    <footer className="mt-8">
      <div className="text-text flex max-w-7xl flex-col gap-2 py-6">
        <span>All rights reserved © daku10 2024</span>
        <span>
          本サイトはGoogle Analyticsを使用しています。詳細は
          <Link
            href="https://policies.google.com/technologies/partner-sites?hl=ja"
            className="text-link underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            こちら
          </Link>
          をご覧ください。
        </span>
        <span>
          本サイトに関するライセンスは
          <Link href="/about" className="text-link underline">
            こちら
          </Link>
          をご覧ください。
        </span>
      </div>
    </footer>
  );
};
