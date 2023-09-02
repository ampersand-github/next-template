import { Button } from "@/__shared__/components/ui/button";
import { url } from "@/__shared__/utils/url";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center space-y-12 p-24">
      <h1 className="text-4xl font-bold">Hello, world!</h1>
      <div className={"grid-cols-8 space-x-8 space-y-4"}>
        <Button asChild>
          <Link href={url.STRING_NUMERIC_INPUT}>数字をいい感じにする</Link>
        </Button>
        <Button asChild>
          <Link href={url.ADDRESS}>住所入力フォーム</Link>
        </Button>
        <Button asChild>
          <Link href={url.IMPORT_ACCESS}>import-access</Link>
        </Button>
        <Button asChild>
          <Link href={url.LOGIN}>ログイン</Link>
        </Button>
        <Button asChild>
          <Link href={url.IMAGE_UPLOAD}>イメージのアップロード</Link>
        </Button>
        <Button asChild>
          <Link href={url.IMAGE_DOWNLOAD}>イメージのダウンロード</Link>
        </Button>
        <Button asChild>
          <Link href={url.COUNTER}>COUNTER</Link>
        </Button>
        <Button asChild>
          <Link href={url.MATCHING}>MATCHING</Link>
        </Button>
        <Button asChild>
          <Link href={url.FLOW}>FLOW</Link>
        </Button>
      </div>
    </main>
  );
}
