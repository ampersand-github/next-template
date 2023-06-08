import { storage } from "@/app/api/storage";
import { NextApiRequest } from "next";
import { ulid } from "ulid";
import { bucketName, version } from "@/app/api/storage/simple";

export async function GET(req: NextApiRequest) {
  // セッションの取得
  // const session = await getCurrentUser();

  // 画像をアップロードするために認証は必須
  // if (!session) return res.status(401).json({ message: "Unauthorized" });

  // ファイル名
  const fileName = new URL(req.url as string).searchParams.get("file");
  if (!fileName) {
    const data = JSON.stringify({ message: "file is required" });
    return new Response(data, { status: 400 });
  }

  const [response] = await storage
    .bucket(bucketName)
    .file(`${version}/${ulid().toString()}`)
    .generateSignedPostPolicyV4({
      expires: Date.now() + 1 * 60 * 1000,
      fields: { "x-goog-meta-test": "data" },
    });

  // レスポンスの返却
  return new Response(JSON.stringify(response), { status: 200 });
}
