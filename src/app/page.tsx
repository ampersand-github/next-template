import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const STRING_NUMERIC_INPUT = "operation-check/string-numeric-input";
  const ADDRESS = "operation-check/address";
  const IMPORT_ACCESS = "operation-check/import-access";
  return (
    <main className="flex min-h-screen flex-col items-center space-y-12 p-24">
      <h1 className="text-4xl font-bold">Hello, world!</h1>
      <Button asChild>
        <Link href={STRING_NUMERIC_INPUT}>数字をいい感じにする</Link>
      </Button>
      <Button asChild>
        <Link href={ADDRESS}>住所入力フォーム</Link>
      </Button>
      <Button asChild>
        <Link href={IMPORT_ACCESS}>import-access</Link>
      </Button>
    </main>
  );
}
