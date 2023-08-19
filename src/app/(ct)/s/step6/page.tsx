import { Suspense } from "react";
import { StepSix } from "./_components";

export default async function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StepSix />
    </Suspense>
  );
}
