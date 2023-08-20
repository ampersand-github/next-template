import Image from "next/image";

type Props = { productImage: string };

export const ProductImagePresenter = ({ productImage }: Props) => {
  return (
    <Image
      src={
        productImage === "" ? "https://placehold.jp/400x225.png" : productImage
      }
      alt={"product image"}
      width={400}
      height={225}
    />
  );
};
