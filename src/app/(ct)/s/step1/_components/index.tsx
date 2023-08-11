"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Step1Presenter } from "./index.presenter";

export const PRODUCT = [
  { value: "PC", label: "PC" },
  { value: "Flower", label: "Flower" },
  { value: "Car", label: "Car" },
] as const;

export const DELIVERY = [
  { value: "Ships", label: "Ships" },
  { value: "PickUp", label: "PickUp" },
] as const;

export const Color = [
  { id: "red", label: "Red" },
  { id: "green", label: "Green" },
] as const;

const stepOneSchema = z.object({
  product: z.string(),
  delivery: z.string(),
  color: z.string().optional(), // https://ui.shadcn.com/docs/components/radio-group
});

export const Step1Container = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof stepOneSchema>>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      product: "",
      color: "",
      delivery: "",
    },
  });

  const onProductChange = async (value: string) => {
    console.log("product.change", value);
    form.setValue("product", value);

    // formの値がリセットされる。
    // deliveryのセレクトボックスの値もvalue={field.value}を指定しているので画面表記もリセットされる。
    form.setValue("delivery", "");

    // 要件には書いてないが？？？
    if (value !== "Flower") form.setValue("color", "");

    router.refresh();
  };

  const onSubmit = (data: z.infer<typeof stepOneSchema>) => {
    console.log(data);
  };

  return (
    <Step1Presenter
      form={form}
      onSubmit={onSubmit}
      onProductChange={onProductChange}
    />
  );
};
