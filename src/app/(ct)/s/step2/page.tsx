import { Suspense } from "react";
import { StepTwo } from "./_components";

export default async function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StepTwo />
    </Suspense>
  );
}
