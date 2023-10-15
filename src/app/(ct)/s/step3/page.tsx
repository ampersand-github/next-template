import { Suspense } from "react";
import { StepThree } from "./_components";

export default async function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StepThree />
    </Suspense>
  );
}
