"use client";

import { useToast } from "@/components/ui/use-toast";
import { Result } from "@/lib/result/result";
import { fetchDownloadUrl } from "./fetch-download-url";
import { DownloadImagePresenter } from "./index.presenter";

export const DownloadImage = async () => {
  const { toast } = useToast();
  const result: Result<string, Error> = await fetchDownloadUrl();

  if (result.isFailure()) {
    toast({ title: "画像の取得に失敗しました", variant: "error" });
    throw new Error(result.value.message);
  }

  return <DownloadImagePresenter src={result.value} />;
};
