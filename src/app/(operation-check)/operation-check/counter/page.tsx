import { getCurrentUser } from "@/__shared__/utils/auth/get-current-user";
import Loading from "@/app/(operation-check)/operation-check/counter/loading";
import { counters as PrismaCounter } from "@prisma/client";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { db } from "../../../../__shared__/utils/db";
import { PlusOneButton } from "./_components";

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/operation-check/auth");

  const result: Pick<PrismaCounter, "count"> | null =
    await db.counters.findUnique({
      select: { count: true },
      where: { user_id: user.id },
    });
  const count: number = result ? result.count : 0;

  return (
    <>
      <h1 className="text-4xl font-bold">counter</h1>
      <Suspense fallback={<Loading />}>
        <p>count:{count}</p>
      </Suspense>
      {/* @ts-expect-error Server Component */}
      <PlusOneButton count={count} />
    </>
  );
}
