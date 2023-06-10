"use client";

import { useToast } from "@/components/ui/use-toast";
import { Result } from "@/lib/result/result";
import Image from "next/image";
import { fetchDownloadUrl } from "./fetch-download-url";

let result: Result<string, Error> | undefined;

export const DownloadImage = () => {
  const { toast } = useToast();

  if (!result) {
    throw fetchDownloadUrl().then((r: Result<string, Error>) => (result = r));
  }

  if (result.isFailure()) {
    toast({ title: "画像の取得に失敗しました", variant: "error" });
    throw new Error(result.value.message);
  }

  return (
    <Image
      suppressHydrationWarning
      src={result.value}
      alt={"image"}
      width={1600}
      height={900}
    ></Image>
  );
};
