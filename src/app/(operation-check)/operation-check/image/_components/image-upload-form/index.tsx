"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Failure, Result, Success } from "@/lib/result/result";
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

const uploadImage = async (): Promise<Result<string, Error>> => {
  try {
    // データを送信する
    const url = "/api/storage/simple/upload";
    const result = await fetch(url, { method: "POST" });

    // エラーハンドリング
    if (!result.ok) {
      // todo HTTPステータスを外部のロガーに送信したい
      const error = new Error("画像を送信できませんでした");
      return new Failure(error);
    }

    // レスポンスをパースする
    const json = await result.json();
    const parseResult = schema.safeParse(json);

    // パースしたデータのエラーハンドリング
    if (!parseResult.success) {
      const error = new Error(parseResult.error.errors[0].message);
      return new Failure(error);
    }

    return new Success("画像のアップロードに成功しました");
  } catch (e) {
    if (e instanceof Error) {
      return new Failure(e);
    }
    return new Failure(new Error("画像のアップロードに失敗しました"));
  }
};

export const ImageUploadForm = () => {
  const cropperImage = useAtomValue(cropperImageAtom);
  const { toast } = useToast();

  const handleClick = async () => {
    const result: Result<string, Error> = await uploadImage();

    // エラー処理
    if (result.isFailure()) {
      toast({ title: result.value.message, variant: "error" });
      throw result.value;
    }

    // 成功表示
    toast({ title: result.value, variant: "success" });
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
