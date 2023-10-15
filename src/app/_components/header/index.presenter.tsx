import { Button } from "@/__shared__/components/ui/button";
import { url } from "@/__shared__/utils/url";
import Image from "next/image";
import Link from "next/link";

export const HeaderPresenter = () => {
  const iconSize = 32;
  return (
    <header className={"flex h-16 items-center justify-between bg-gray-50"}>
      {/* 左部分 */}
      <Link href={url.TOP}>
        <div className={"mx-8 flex flex-row items-center space-x-2 "}>
          <Image
            src={"/icon.png"}
            alt={"icon"}
            width={iconSize}
            height={iconSize}
          />
          <h1 className={"invisible text-lg font-black md:visible"}>
            Next.jsテンプレート
          </h1>
        </div>
      </Link>

      {/* 中央部分 */}
      <div>
        <Link href={url.TOP}>真ん中</Link>
      </div>

      {/* 右部分 */}
      <div className={"mx-8"}>
        <Button className={"bg-blue-500"}>右側にありがち</Button>
      </div>
    </header>
  );
};
