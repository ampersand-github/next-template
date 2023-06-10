import { Failure, Result, Success } from "@/lib/result/result";

/**
 * @public
 */
export const upload = async (
  path: string,
  image: File
  // uploadType: "anonymous" | "public" | "private"
): Promise<Result<string, Error>> => {
  // nextのapiのurlを作成
  const origin = window.location.origin;
  const nextApiUrl = new URL(`${origin}/api/storage/${path}/upload`);
  nextApiUrl.searchParams.append("file", image.name);

  // nextのapiを叩いて、署名付きURLを取得
  const res = await fetch(nextApiUrl, { method: "GET" });
  if (!res.ok) {
    return new Failure(new Error("署名付きURLを取得できませんでした"));
  }
  const { url, fields } = await res.json();

  // アップロードの準備
  const body = new FormData();
  Object.entries({ ...fields }).forEach(([key, value]) => {
    body.append(key, value as string);
  });
  body.append("file", image); // key名はfileにしないとCORSエラーになる。意味わからない

  // 署名付きURLにファイルをアップロード
  const res2 = await fetch(url, { method: "POST", body });
  if (!res2.ok) {
    return new Failure(new Error("ファイルをアップロードできませんでした"));
  }

  // 返却
  return new Success(fields.key); // keyはファイルパス
};
