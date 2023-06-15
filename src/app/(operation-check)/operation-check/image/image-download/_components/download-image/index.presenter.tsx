"use client";

import Image from "next/image";

type Props = {
  src: string;
};
export const DownloadImagePresenter = ({ src }: Props) => {
  return (
    <Image
      suppressHydrationWarning
      src={src}
      alt={"image"}
      width={1600}
      height={900}
    ></Image>
  );
};
