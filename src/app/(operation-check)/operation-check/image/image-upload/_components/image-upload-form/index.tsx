"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Failure, Result, Success } from "@/lib/result/result";
import { upload } from "@/lib/storage/upload";
import imageCompression from "browser-image-compression";
import { atom, useAtomValue } from "jotai";
import Image from "next/image";
import { useState } from "react";
import { CropperDialog } from "./crop-dialog";

export const cropperImageAtom = atom<File | undefined>(undefined);

const uploadImage = async (image: File): Promise<Result<string, Error>> => {
  try {
    // 結構時間かかる 10mb -> 1mbにするのに20秒かかった
    const resizedImage = await imageCompression(image, {
      maxSizeMB: 1,
      maxWidthOrHeight: 2028,
    });

    const result: Result<string, Error> = await upload("simple", resizedImage);

    if (result.isFailure()) {
      return result;
    }

    return new Success("アップロードに成功しました");
  } catch (e) {
    return new Failure(new Error("画像のアップロードに失敗しました"));
  }
};

export const ImageUploadForm = () => {
  const cropperImage = useAtomValue(cropperImageAtom);
  const [isUploading, setUploading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleClick = async () => {
    if (!cropperImage) {
      toast({ title: "画像を選択してください", variant: "error" });
      return;
    }

    setUploading(true);
    const result = await uploadImage(cropperImage);
    setUploading(false);

    if (result.isFailure()) {
      // todo HTTPステータスを外部のロガーに送信したい
      toast({ title: result.value.message, variant: "error" });
    } else {
      toast({ title: result.value, variant: "success" });
    }
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
