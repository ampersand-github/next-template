import { env } from "@/env.mjs";
import { Failure, Result, Success } from "@/lib/result";
import { z } from "zod";

const schema = z.object({
  url: z
    .string({ required_error: "値がありません" })
    .url({ message: "url形式ではありません" }),
});

export const fetchDownloadUrl = async (): Promise<Result<string, Error>> => {
  const origin = env.NEXT_PUBLIC_ORIGIN;
  // 値を直に入れているが、本当はDBから取得するべき
  const imagePath = "01H2HM0XHA7GAFV5BVPD2HFCTX";
  const nextApiUrl = new URL(`${origin}/api/storage/simple/download`);
  nextApiUrl.searchParams.append("path", imagePath);

  // APIにアクセスして画像のURLを取得する
  const response = await fetch(nextApiUrl, { method: "GET" });
  if (!response.ok) {
    return new Failure(new Error("画像の取得に失敗しました"));
  }

  // レスポンスをパースする
  const json = await response.json();
  const result = schema.safeParse(json);
  if (!result.success) {
    return new Failure(new Error(result.error.errors[0].message));
  }

  return new Success(result.data.url);
};
