"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { atom, useAtomValue } from "jotai";
import Image from "next/image";
import { useState } from "react";
import { CropperDialog } from "./crop-dialog";
import { uploadImage } from "./upload-image";

export const cropperImageAtom = atom<File | undefined>(undefined);

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
      toast({ title: "アップロードに成功しました", variant: "error" });
    } else {
      toast({ title: "画像のアップロードに失敗しました", variant: "success" });
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
