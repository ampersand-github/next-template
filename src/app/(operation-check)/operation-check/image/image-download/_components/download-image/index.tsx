"use client";

import { useToast } from "@/__shared__/components/ui/use-toast";
import { Result } from "../../../../../../../__shared__/utils/result";
import { fetchDownloadUrl } from "./fetch-download-url";
import { DownloadImagePresenter } from "./index.presenter";

export const DownloadImage = async () => {
  const { toast } = useToast();
  const result: Result<string, Error> = await fetchDownloadUrl();

  if (result.isFailure()) {
    toast({ title: "画像が取得できませんでした", variant: "error" });
    throw new Error("画像が取得できませんでした");
  }

  return <DownloadImagePresenter src={result.value} />;
};
