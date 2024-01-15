import { Link } from "../../components/Link";

// TODO: hover color
export const Footer = () => {
  return (
    <footer className="mt-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        <span>All rights reserved © daku10 2024</span>
        <span>
          このサイトはGoogle Analyticsを使用しています。詳細は
          <Link
            href="https://policies.google.com/technologies/partner-sites?hl=ja"
            withUnderline
          >
            こちら
          </Link>
          をご覧ください。
        </span>
      </div>
    </footer>
  );
};
