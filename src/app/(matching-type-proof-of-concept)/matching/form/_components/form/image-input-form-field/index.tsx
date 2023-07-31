import { OptionalLabel } from "@/__shared__/components/original/optional-label";
import { RequiredLabel } from "@/__shared__/components/original/required-label";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/__shared__/components/ui/form";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import { useState } from "react";
import { Control } from "react-hook-form";
import { FormValues } from "../index";
import { CropperDialog } from "./crop-dialog";

type Props = {
  isRequired: boolean;
  control: Control<FormValues>;
  name: keyof FormValues;
  label: string;
  description: string;
};

export const ImageInputFormField = ({
  isRequired,
  control,
  name,
  label,
  description,
}: Props) => {
  const [isCompression, setCompression] = useState<boolean>(false);
  const [image, setImage] = useState<File | undefined>(undefined);

  const handleTrimming = async (file: File) => {
    setCompression(true);
    // 結構時間かかる 10mb -> 1mbにするのに20秒かかった
    const resizedImage = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1960,
    });
    setCompression(false);

    setImage(resizedImage);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={"flex flex-row items-center space-x-2"}>
            <p>{label}</p>
            {isRequired ? <RequiredLabel /> : <OptionalLabel />}
          </FormLabel>
          <FormControl>
            <div className={"space-y-4 py-4"}>
              <CropperDialog onTrimming={handleTrimming} />
              {isCompression && (
                <div
                  className="flex items-center justify-center space-x-2 "
                  aria-label="圧縮中"
                >
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                  <p>圧縮中...</p>
                </div>
              )}
              {!isCompression && image && (
                <Image
                  src={URL.createObjectURL(image)}
                  alt={"preview"}
                  width={1600}
                  height={900}
                />
              )}
            </div>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
