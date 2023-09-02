import { Suspense } from "react";
import { Container } from "./_components";

export default async function Page() {
  return (
    <Suspense>
      <Container />
    </Suspense>
  );
}
