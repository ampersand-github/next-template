import { Failure, Result, Success } from "../../../../../../../../__shared__/utils/result";
import { upload } from "@/__shared__/utils/storage/upload";
import imageCompression from "browser-image-compression";

export const uploadImage = async (
  image: File
): Promise<Result<string, Error>> => {
  try {
    // 結構時間かかる 10mb -> 1mbにするのに20秒かかった
    const resizedImage = await imageCompression(image, {
      maxSizeMB: 1,
      maxWidthOrHeight: 2028,
    });

    const result: Result<string, Error> = await upload("simple", resizedImage);

    if (result.isFailure()) return result;

    return new Success("アップロードに成功しました");
  } catch (e) {
    return new Failure(new Error("画像のアップロードに失敗しました"));
  }
};
