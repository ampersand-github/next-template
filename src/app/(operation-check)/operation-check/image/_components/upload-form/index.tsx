"use client";

import { Button } from "@/components/ui/button";
import { useAtomValue } from "jotai";
import { cropperImageAtom } from "../../index";
import Image from "next/image";

export const UploadForm = () => {
  const cropperImage = useAtomValue(cropperImageAtom);

  const handleClick = () => {
    console.log("投稿する");
  };

  return (
    <div>
      {cropperImage && (
        <>
          <Image
            src={URL.createObjectURL(cropperImage)}
            alt={"preview"}
            width={1600}
            height={900}
          />

          <Button type="button" onClick={handleClick}>
            投稿する
          </Button>
        </>
      )}
    </div>
  );
};
