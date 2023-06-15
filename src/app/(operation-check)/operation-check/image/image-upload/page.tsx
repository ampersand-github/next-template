import { Suspense } from "react";
import { ImageUploadForm } from "./_components";

export default async function Page() {
  return (
    <main className="flex flex-col space-y-8 p-24">
      <h1 className="text-4xl font-bold">image</h1>
      <Suspense fallback={<div>loading...</div>}>
        <ImageUploadForm />
      </Suspense>
    </main>
  );
}
