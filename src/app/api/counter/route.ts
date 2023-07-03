import { getCurrentUser } from "@/__shared__/utils/auth/get-current-user";
import { z } from "zod";
import { db } from "../../../__shared__/utils/db";
import { Failure, Result, Success } from "../../../__shared__/utils/result";

const patchSchema = z.object({ count: z.number() });

export async function PATCH(req: Request) {
  try {
    // 認証処理
    const user = await getCurrentUser();
    if (!user) return new Response("", { status: 401 });

    // バリデーション処理
    const json = await req.json();
    const parseResult = patchSchema.safeParse(json);
    if (!parseResult.success) return new Response("", { status: 400 });

    // ユースケース処理
    const useCase = new CounterUpsertUseCase();
    const props = { userId: user.id, count: parseResult.data.count };
    const useCaseResult = await useCase.execute(props);
    if (useCaseResult.isFailure()) return new Response("", { status: 500 });

    // 値の返却
    return new Response("", { status: 200 });
  } catch (e) {
    return new Response("", { status: 500 });
  }
}

// ---------------------------------------------
// ユースケース
//----------------------------------------------
type RequestType = {
  userId: string;
  count: number;
};

type ResponseBaseType = {
  count: number;
};

type ResponseType = Result<ResponseBaseType, Error>;

class CounterUpsertUseCase {
  async execute({ userId, count }: RequestType): Promise<ResponseType> {
    try {
      const prismaResult = await db.$transaction(async (prisma) => {
        return await prisma.counters.upsert({
          where: { user_id: userId },
          create: { user_id: userId, count: count },
          update: { count: count },
        });
      });
      return new Success({ count: prismaResult.count });
    } catch (e) {
      return new Failure(new Error("CounterUpsertUseCaseError"));
    }
  }
}
