import { Icon } from "@/components/Icon";
import { Link } from "@/components/Link";

export default function Page() {
  return (
    <div className="grid gap-16 md:grid-cols-[max-content_1fr]">
      <div className="grid grid-rows-[max-content] place-content-center place-items-center gap-6">
        <img
          src="/assets/images/profile.webp"
          className="rounded-full"
          width="240"
          height="240"
          alt="profile"
        />
        <span className="text-xl font-bold text-primary">daku10</span>
        <div className="grid grid-cols-3 gap-10">
          <Link
            href="https://zenn.dev/daku10"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon type="zenn" className="h-6 w-6" />
          </Link>
          <Link
            href="https://github.com/daku10"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon type="github" className="h-6 w-6" />
          </Link>
          <Link href="https://twitter.com/daku10_dev">
            <Icon type="x" className="h-6 w-6" />
          </Link>
        </div>
        <div className="">
          <p className="text-text">
            &ldquo;だくてん&rdquo;と読みます。
            <br />
            アバターは実家の犬です。
            <br />
            現在フリーランスとして活動中。
            <br />
          </p>
        </div>
      </div>
      <div>
        <div>
          <h2 className="text-xl text-primary">本サイトについて</h2>
          <p className="mt-6 text-text">
            本サイトでは、Web開発に関する記事を発信していきます。
            <br />
            記事の内容に誤りがあった場合は、
            <Link
              href="https://github.com/daku10/blog.daku10.dev/issues"
              className="text-link underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHubのIssue
            </Link>
            や
            <Link
              href="https://twitter.com/daku10_dev"
              className="text-link underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </Link>
            で教えていただけると嬉しいです。
          </p>
        </div>
        <div>
          <h2 className="mt-8 text-xl text-primary">
            サイトのライセンスポリシー
          </h2>
          <div className="mt-6 grid gap-4 text-text">
            <section className="">
              <h3 className="text-lg">コードとスニペットのライセンス</h3>
              <p className="mt-2">
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
            <section className="">
              <h3 className="text-lg">コードとスニペット以外のライセンス</h3>
              <p className="mt-2">
                本サイトに掲載されるコードやスニペット以外のコンテンツに関しては、原則として著作権は著作者に帰属します。
              </p>
            </section>
            <section className="">
              <h3 className="text-lg">例外</h3>
              <p className="mt-2">
                別のライセンスが明記されている場合、または引用されたものである場合は、それぞれのライセンス条件が適用されます。
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
