import { Suspense } from "react";
import { DownloadImage } from "./_components";

export default async function Page() {
  return (
    <main className="flex flex-col space-y-8 p-24">
      <h1 className="text-4xl font-bold">download-image</h1>
      <Suspense fallback={<>loading...</>}>
        {/* @ts-expect-error Async Server Component */}
        <DownloadImage />
      </Suspense>
    </main>
  );
}
