import { getCurrentUser } from "@/lib/auth/get-current-user";
import { db } from "@/lib/db/db";
import { redirect } from "next/navigation";
import { PlusOneButton } from "./_components";

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/operation-check/auth");

  const result = await db.counter.findUnique({
    select: { count: true },
    where: { user_id: user.id },
  });
  const count = result ? result.count : 0;

  return (
    <main className="space-y-8 p-24">
      <h1 className="text-4xl font-bold">counter</h1>
      <p>count:{count}</p>
      {/* @ts-expect-error Server Component */}
      <PlusOneButton count={count} />
    </main>
  );
}
