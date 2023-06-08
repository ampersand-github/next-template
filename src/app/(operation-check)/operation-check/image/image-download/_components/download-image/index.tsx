"use client";

import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { z } from "zod";

const schema = z.object({
  url: z
    .string({ required_error: "値がありません" })
    .url({ message: "url形式ではありません" }),
});

export const DownloadImage = async () => {
  const { toast } = useToast();

  // 値を直に入れているが、本当はDBから取得するべき
  const imagePath = "01H2D5K0ZS7X12PW0YY5FJHV1W";
  const origin = "http://localhost:3000";
  const nextApiUrl = new URL(`${origin}/api/storage/simple/download`);
  nextApiUrl.searchParams.append("path", imagePath);

  const response = await fetch(nextApiUrl, { method: "GET" });
  if (!response.ok) {
    toast({ title: "画像の取得に失敗しました", variant: "error" });
    throw new Error("画像の取得に失敗しました");
  }
  const json = await response.json();
  const result = schema.safeParse(json);
  if (!result.success) {
    toast({ title: result.error.errors[0].message, variant: "error" });
    throw result.error;
  }

  return (
    <Image
      src={result.data.url}
      alt={"image"}
      width={1600}
      height={900}
    ></Image>
  );
};
