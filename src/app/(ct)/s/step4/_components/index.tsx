"use client";

import { toast } from "@/__shared__/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StepFourFormPresenter } from "./index.presenter";

export type Option = {
  readonly id: string;
  readonly value: string;
  readonly label: string;
};

const USER_TYPE: Record<string, Option> = {
  personal: {
    id: "personal",
    label: "Personal",
    value: "personal",
  },
  company: {
    id: "company",
    label: "Company",
    value: "company",
  },
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

export const COLOR: Record<string, Option> = {
  red: {
    id: "red",
    value: "red",
    label: "Red",
  },
  green: {
    id: "green",
    value: "green",
    label: "Green",
  },
};

const products: [string] = Object.values(PRODUCT).map(
  (item: Option) => item.value
) as [string];
const deliveries: [string] = Object.values(DELIVERY).map(
  (item: Option) => item.value
) as [string];

export const stepFourSchema = z.object({
  userType: z.string({ required_error: "ユーザータイプを選択してください" }),
  product: z.enum(products, {
    errorMap: (error) => {
      if (error.code === "invalid_type")
        return { message: "商品を選択してくてください" };
      return { message: "商品を選択してくてください" };
    },
  }),
  delivery: z.enum(deliveries, {
    errorMap: (error) => {
      if (error.code === "invalid_type")
        return { message: "配送オプションを選択してください" };
      return { message: "配送オプションを選択してください" };
    },
  }),
  color: z.string().optional(),
});

export function StepFour() {
  const form = useForm<z.infer<typeof stepFourSchema>>({
    resolver: zodResolver(stepFourSchema),
    defaultValues: {
      userType: USER_TYPE.personal.value,
      color: COLOR.red.value,
    },
  });

  const onProductChange = async (value: string) => {
    const delivery: string | undefined = form.getValues("delivery");
    form.resetField("product");
    form.setValue("product", value);

    // 個人のときは、プロダクトを変更したときに配送オプションをリセットする(法人のときはしない)
    if (form.getValues("userType") === USER_TYPE.personal.value) {
      form.setValue("delivery", ""); // 画面上の表記をリセット
    }

    if (form.getValues("userType") === USER_TYPE.company.value) {
      // 法人のときは、プロダクトを変更したときに配送オプションをリセットしない都合上、
      // car -> shipsのときは、配送オプションをPickUpに変更する
      if (value === PRODUCT.car.value && delivery === DELIVERY.ships.value) {
        // form.resetField("delivery"); // formの値をリセット
        form.setValue("delivery", DELIVERY.pickUp.value);
      }
    }
  };

  const onSubmit = (data: z.infer<typeof stepFourSchema>) => {
    // productがFlowerの場合は、colorを送信する。そうじゃない場合は空文字を送信する
    const _color: string =
      data.color && data.product === PRODUCT.flower.value ? data.color : "";

    toast({
      title: "送信した値",
      variant: "info",
      description: (
        <div>
          <p>userType: {data.userType}</p>
          <p>product: {data.product}</p>
          <p>color: {_color}</p>
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
    <StepFourFormPresenter
      form={form}
      onSubmit={onSubmit}
      onValueChange={onProductChange}
      onSelectDisabled={onSelectDisabled}
      USER_TYPE={USER_TYPE}
      PRODUCT={PRODUCT}
      DELIVERY={DELIVERY}
      COLOR={COLOR}
    />
  );
}
