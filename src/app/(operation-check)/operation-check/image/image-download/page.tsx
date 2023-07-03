import { getCurrentUser } from "@/__shared__/utils/auth/get-current-user";
import { Suspense } from "react";
import { DownloadImage } from "./_components";

export default async function Page() {
  // serverコンポーネントととして動作してほしいが、BuildするとStaticコンポーネントとして動作してしまう
  // そのため、getCurrentUser()を呼び出してserverコンポーネントとして動作させる
  // Generating static pages (0/15)TypeError: fetch failed
  await getCurrentUser();
  return (
    <main className="flex max-w-full flex-col space-y-8 p-24">
      <h1 className="text-4xl font-bold">download-image</h1>
      <Suspense fallback={<div>loading...</div>}>
        {/* @ts-expect-error Server Component */}
        <DownloadImage />
      </Suspense>
    </main>
  );
}
