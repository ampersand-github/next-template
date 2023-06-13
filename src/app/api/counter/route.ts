import { getCurrentUser } from "@/lib/auth/get-current-user";
import { db } from "@/lib/db/db";
import { counter as PrismaCounter } from "@prisma/client";
export async function PATCH(req: Request) {
  const user = await getCurrentUser();
  // todo Result型で返す
  if (!user) return new Response(null, { status: 401 });

  // todo zodでバリデーション
  // todo Result型で返す
  const { count } = await req.json();
  console.log(count);

  const update: PrismaCounter = await db.counter.upsert({
    where: { user_id: user.id },
    create: { user_id: user.id, count },
    update: { count },
  });
  console.log(update)

  // todo Result型で返す
  return new Response(JSON.stringify({ isOk: true }));
}
