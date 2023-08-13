"use client";

import { toast } from "@/__shared__/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StepTwoFormPresenter } from "./index.presenter";

export type Option = {
  readonly id: string;
  readonly value: string;
  readonly label: string;
};

const PRODUCT: Record<string, Option> = {
  pc: {
    id: "pc",
    label: "PC",
    value: "pc",
  },
  flower: {
    id: "flower",
    label: "Flower",
    value: "flower",
  },
  car: {
    id: "car",
    label: "Car",
    value: "car",
  },
};

const DELIVERY: Record<string, Option> = {
  ships: {
    id: "ships",
    label: "Ships",
    value: "ships",
  },
  pickUp: {
    id: "pickUp",
    label: "PickUp",
    value: "pickUp",
  },
};

const products: [string] = Object.values(PRODUCT).map(
  (item: Option) => item.value
) as [string];
const deliveries: [string] = Object.values(DELIVERY).map(
  (item: Option) => item.value
) as [string];

export const stepTwoSchema = z.object({
  product: z.enum(products, { required_error: "商品を選択してください" }),
  delivery: z.enum(deliveries, {
    required_error: "配送オプションを選択してください",
  }),
});

export function StepTwo() {
  const form = useForm<z.infer<typeof stepTwoSchema>>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {},
  });

  const onProductChange = async (value: string) => {
    form.setValue("product", value);

    // 配送オプションをリセット
    form.resetField("delivery"); // formの値をリセット
    form.setValue("delivery", ""); // 画面上の表記をリセット
  };

  const onSubmit = (data: z.infer<typeof stepTwoSchema>) => {
    toast({
      title: "送信した値",
      variant: "info",
      description: (
        <div>
          <p>product: {data.product}</p>
          <p>delivery: {data.delivery}</p>
        </div>
      ),
    });
  };

  const onSelectDisabled = (value: string) => {
    const product = form.getValues("product");
    return product === PRODUCT.car.value && value === DELIVERY.ships.value;
  };

  return (
    <StepTwoFormPresenter
      form={form}
      onSubmit={onSubmit}
      onValueChange={onProductChange}
      PRODUCT={PRODUCT}
      DELIVERY={DELIVERY}
      onSelectDisabled={onSelectDisabled}
    />
  );
}
