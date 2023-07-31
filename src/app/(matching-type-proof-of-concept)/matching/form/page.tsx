import Loading from "@/app/(matching-type-proof-of-concept)/loading";
import { Suspense } from "react";
import { NursingTaxiForm } from "./_components";

export default async function Page() {
  return (
    <div className={" flex flex-col items-center"}>
      <div className={"max-w-screen-xl space-y-8"}>
        <h1 className="text-2xl font-bold">事業者向けフォーム</h1>
        <Suspense fallback={<Loading />}>
          <div className={"flex items-center"}>
            <NursingTaxiForm />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
