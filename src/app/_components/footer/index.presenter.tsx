import { url } from "@/__shared__/utils/url";
import Link from "next/link";

export const FooterPresenter = () => {
  const font = "text-md sm:text-sm text-muted-foreground";
  return (
    <footer className={"flex items-center justify-center bg-gray-50"}>
      <div className={"mx-8"}>
        <div className={"flex flex-col items-center justify-center p-8"}>
          <div
            className={
              "flex flex-col items-center space-y-2 sm:flex-row sm:justify-center sm:space-x-2"
            }
          >
            <p></p> {/* 最初のp要素が上にブレるので回避策として入れる */}
            <Link href={url.TOP}>
              <p className={`${font}`}>運営会社</p>
            </Link>
            <Link href={url.TOP}>
              <p className={`${font}`}>お問い合わせ</p>
            </Link>
            <Link href={url.TOP}>
              <p className={`${font}`}>利用規約</p>
            </Link>
            <Link href={url.TOP}>
              <p className={`${font}`}>プライバシーポリシー</p>
            </Link>
            <Link href={url.TOP}>
              <p className={`${font}`}>特定商取引法の表示</p>
            </Link>
          </div>
          <p className={`mt-4 ${font}`}>© 2023 ampersand</p>
        </div>
      </div>
    </footer>
  );
};
