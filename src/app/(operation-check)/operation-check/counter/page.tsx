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

  /*
  const aaa = await fetch(`${env.NEXT_PUBLIC_ORIGIN}/api/counter`, {
    // cache: "no-cache",
    headers: { "Content-Type": "application/json",
    "Authorization":`token ${user.id}`
    },

  });
 */

  /*
   const plusOne = async () => {
    await db.counter.upsert({
      create: { count: 1, user_id: user.id },
      update: { count: count + 1 },
      where: { user_id: user.id },
    });
  };
   */

  return (
    <main className="space-y-8 p-24">
      <h1 className="text-4xl font-bold">counter</h1>
      <p>count:{count}</p>
      {/* @ts-expect-error Server Component */}
      <PlusOneButton count={count} />
    </main>
  );
}
