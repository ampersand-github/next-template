"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Failure, Result, Success } from "@/lib/result/result";
import { upload } from "@/lib/storage/upload";
import imageCompression from "browser-image-compression";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { useState } from "react";
import { cropperImageAtom } from "../index";
import { CropperDialog } from "./crop-dialog";

const uploadImage = async (image: File): Promise<Result<string, Error>> => {
  try {
    // 結構時間かかる 10mb -> 1mbにするのに20秒かかった
    const resizedImage = await imageCompression(image, {
      maxSizeMB: 1,
      maxWidthOrHeight: 2028,
    });

    // データを送信する
    const result: Result<string, Error> = await upload("simple", resizedImage);
    if (result.isFailure()) {
      // todo HTTPステータスを外部のロガーに送信したい
      console.log(result.value.message);
      const error = new Error("画像を送信できませんでした");
      return new Failure(error);
    }

    return new Success(result.value);
  } catch (e) {
    if (e instanceof Error) {
      return new Failure(e);
    }
    return new Failure(new Error("画像のアップロードに失敗しました"));
  }
};

export const ImageUploadForm = () => {
  const cropperImage = useAtomValue(cropperImageAtom);
  const [isUploading, setUploading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleClick = async () => {
    setUploading(true);

    // 画像がない場合はエラー
    if (!cropperImage) {
      toast({ title: "画像を選択してください", variant: "error" });
      setUploading(false);
      return;
    }

    // 画像をアップロードする
    const result = await uploadImage(cropperImage);
    if (result.isFailure()) {
      toast({ title: result.value.message, variant: "error" });
      setUploading(false);
      throw result.value;
    }

    // todo DBへ保存したパスを保存

    // 成功表示
    toast({ title: "画像のアップロードに成功しました", variant: "success" });
    setUploading(false);
  };

  if (isUploading) {
    return <div>uploading...</div>;
  }

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
