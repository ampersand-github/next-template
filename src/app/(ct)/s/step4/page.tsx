import { Suspense } from "react";
import { StepFour } from "./_components";

export default async function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StepFour />
    </Suspense>
  );
}
