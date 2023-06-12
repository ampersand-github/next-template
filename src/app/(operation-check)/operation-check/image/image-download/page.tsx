import { Suspense } from "react";

export default async function Page() {
  return (
    <main className="flex flex-col space-y-8 p-24">
      <h1 className="text-4xl font-bold">download-image</h1>
      <Suspense fallback={<div>loading...</div>}>
        {/* <DownloadImage /> */}
      </Suspense>
    </main>
  );
}
