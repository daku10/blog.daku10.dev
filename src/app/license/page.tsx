import { Link } from "@/components/Link";

export const metadata = {
  title: "サイトのライセンスポリシー",
  description: "本サイトのライセンスポリシーについて記載しています。",
};

export default function Page() {
  return (
    <div>
      <h2 className="text-xl text-primary">サイトのライセンスポリシー</h2>
      <div className="text-text mt-8 flex flex-col gap-8">
        <section>
          <h3 className="text-lg">コードとスニペットのライセンス</h3>
          <p className="mt-4">
            本サイトに掲載されている
            プログラミング関連のコードやスニペットについては、
            <Link
              href="https://creativecommons.org/publicdomain/zero/1.0/legalcode.ja"
              className="text-link underline"
            >
              CC0-1.0ライセンス
            </Link>
            の下で提供されます。
          </p>
        </section>
        <section>
          <h3 className="text-lg">コードとスニペット以外のライセンス</h3>
          <p className="mt-4">
            本サイトに掲載されるコードやスニペット以外のコンテンツに関しては、原則として著作権は著作者に帰属します。
          </p>
        </section>
        <section>
          <h3 className="text-lg">例外</h3>
          <p className="mt-4">
            別のライセンスが明記されている場合、または引用されたものである場合は、それぞれのライセンス条件が適用されます。
          </p>
        </section>
      </div>
    </div>
  );
}
