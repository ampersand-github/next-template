import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center space-y-12 p-24">
      <h1 className="text-4xl font-bold">Hello, world!</h1>
      <Button asChild>
        <Link href="operation-check/string-numeric-input">
          数字をいい感じにする
        </Link>
      </Button>
      <Button asChild>
        <Link href="operation-check/address-form">住所入力フォーム</Link>
      </Button>
    </main>
  );
}
