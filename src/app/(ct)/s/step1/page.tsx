import { Suspense } from "react";
import { StepOne } from "./_components";
export default async function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StepOne />
    </Suspense>
  );
}
