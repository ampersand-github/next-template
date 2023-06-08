"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { z } from "zod";
import { cropperImageAtom } from "../../index";
import { CropperDialog } from "./crop-dialog";

const schema = z.object({
  message: z
    .string({ required_error: "メッセージが取得できませんでした" })
    .min(1, { message: "メッセージを取得できませんでした" }),
});

export const ImageUploadForm = () => {
  const cropperImage = useAtomValue(cropperImageAtom);
  const { toast } = useToast();

  const handleClick = async () => {
    let errorToastTitle = "画像のアップロードに失敗しました";

    try {
      // データを送信する
      const url = "/api/storage/simple/upload";
      const result = await fetch(url, { method: "POST" });

      // エラーハンドリング
      if (!result.ok) {
        throw new Error(`${result.status}エラーが発生しました`);
      }

      // レスポンスをパースする
      const json = await result.json();
      const parseResult = schema.safeParse(json);

      // パースしたデータのエラーハンドリング
      if (!parseResult.success) {
        errorToastTitle = parseResult.error.errors[0].message;
        throw parseResult.error;
      }

      console.log("投稿する");
    } catch (error: unknown) {
      // todo エラーの外部送信
      toast({ title: errorToastTitle, variant: "error" });
      throw error;
    }
  };

  return (
    <div className="space-y-8">
      <CropperDialog />
      {cropperImage && (
        <>
          <Image
            src={URL.createObjectURL(cropperImage)}
            alt={"preview"}
            width={1600}
            height={900}
          />

          <div className={"flex justify-end"}>
            <Button type="button" onClick={handleClick}>
              投稿する
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
