import { createErrResponse, createSimpleResponse } from "@/app/api/_utils";
import { FindOneAddress } from "@/backend/address/use-case/find-one-address";
import { SaveAddress } from "@/backend/address/use-case/save-address";
import { ISaveAddressRequest } from "@/backend/address/use-case/save-address/request-interface";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // 認証処理
    const user = await getCurrentUser();
    if (!user) return createErrResponse(401, "ログインしてください");

    // ユースケースの実行
    const useCase = new FindOneAddress(db);
    const response = await useCase.execute(user.id);

    // レスポンス
    const returnValue = JSON.stringify(response);
    return new Response(returnValue, { status: 200 });
  } catch (e) {
    // ログをCloudLoggingに送る
    const user = await getCurrentUser();
    console.error({ userId: user ? user.id : "-", body: "-", error: e });
    return createErrResponse(500, "サーバーエラーが発生しました");
  }
}

export async function POST(req: Request) {
  const body: ISaveAddressRequest = await req.json();
  try {
    // 認証処理
    const user = await getCurrentUser();
    if (!user) return createErrResponse(401, "ログインしてください");

    // ユースケースの実行
    const useCase = new SaveAddress(db);
    await useCase.execute({ ...body, userId: user.id });

    // レスポンス
    return createSimpleResponse(201, "住所を登録しました");
  } catch (e) {
    // ログをCloudLoggingに送る
    const user = await getCurrentUser();
    console.error({ userId: user ? user.id : "-", body: body, error: e });
    return createErrResponse(500, "サーバーエラーが発生しました");
  }
}
