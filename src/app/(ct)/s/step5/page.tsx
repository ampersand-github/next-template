import { Suspense } from "react";
import { StepFive } from "./_components";

export default async function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StepFive />
    </Suspense>
  );
}
