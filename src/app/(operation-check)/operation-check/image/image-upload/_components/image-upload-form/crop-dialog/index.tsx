"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { convertDataUrlToFile } from "@/lib/storage/convert-data-url-to-file";
import "cropperjs/dist/cropper.css"; // 必須 ないとレイアウトが崩れる
import { useSetAtom } from "jotai";
import React, { createRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import { cropperImageAtom } from "../index";

export const CropperDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [image, setImage] = React.useState<File>();
  const cropperRef = createRef<ReactCropperElement>();
  const setFile = useSetAtom(cropperImageAtom);

  // ダイアログを閉じたときの動作
  const handleClose = () => {
    setIsOpen(false);
    setImage(undefined);
  };

  // ダイアログを開いたときの動作
  const handleOpenChange = (bool: Boolean) => {
    if (!bool) handleClose();
    if (bool && !image) setIsOpen(false);
    if (bool && image) setIsOpen(true);
  };

  // ファイルを選択したときの動作
  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return;
    setImage(e.target.files[0]);
    setIsOpen(true);
  };

  // トリミングした画像を取得する
  const getTrimmedImage = async () => {
    if (!cropperRef.current) return;
    const canvas = cropperRef.current.cropper.getCroppedCanvas();
    const dataURL = canvas.toDataURL();
    const file = await convertDataUrlToFile(dataURL, "image.png", "image/png");
    setFile(file);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {/* ダイアログ用のボタン */}
      <DialogTrigger asChild>
        <label className="block">
          <span className="sr-only">Choose profile photo</span>
          <input
            type="file"
            className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
            id="image"
            accept="image/*"
            placeholder="画像"
            onInput={handleInput}
          />
        </label>
      </DialogTrigger>

      {/* ダイアログ本体 */}
      <DialogContent className="sm:max-w-[425px]">
        {/* ダイアログのヘッダー */}
        <DialogHeader>
          <DialogTitle>画像をトリミングする</DialogTitle>
          <DialogDescription>
            枠線に合わせて画像をトリミングしてください。
          </DialogDescription>
        </DialogHeader>
        {/* ダイアログのコンテンツ */}
        <div className="">
          {image && (
            <Cropper
              src={image && URL.createObjectURL(image)}
              ref={cropperRef}
              aspectRatio={16 / 9}
              guides={true}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              autoCropArea={1}
            ></Cropper>
          )}
        </div>
        {/* ダイアログのフッター */}
        <DialogFooter className="gap-y-4">
          <Button
            type="button"
            variant="outline"
            onClick={async () => handleClose()}
          >
            キャンセル
          </Button>
          <Button
            type="button"
            onClick={async () => {
              await getTrimmedImage();
              handleClose();
            }}
          >
            決定する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
