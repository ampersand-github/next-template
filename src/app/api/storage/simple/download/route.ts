import { storage } from "@/app/api/storage";
import { bucketName, version } from "@/app/api/storage/simple";

export async function GET(req: Request) {


  // パス
  const path = new URL(req.url as string).searchParams.get("path");
  if (!path) {
    const message = JSON.stringify({ message: "path is required" });
    return new Response(message, { status: 400 });
  }

  // 画像のダウンロード
  const urlList = await storage
    .bucket(bucketName)
    .file(`${version}/${path}`)
    .getSignedUrl({
      action: "read",
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    });

  const url = { url: urlList[0] };
  // レスポンスの返却
  return new Response(JSON.stringify(url), { status: 200 });
}
