"use client";

import { toast } from "@/__shared__/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StepSixFormPresenter } from "./index.presenter";

export type Option = {
  readonly id: string;
  readonly value: string;
  readonly label: string;
};

const createOption = (id: string, label: string): Option => ({
  id,
  value: id,
  label,
});

const USER_TYPE = {
  personal: createOption("personal", "Personal"),
  company: createOption("company", "Company"),
};

const COMPANY = {
  companyA: createOption("companyA", "companyA"),
  companyB: createOption("companyB", "companyB"),
  companyC: createOption("companyC", "companyC"),
};

const PRODUCT = {
  pc: createOption("pc", "PC"),
  flower: createOption("flower", "Flower"),
  car: createOption("car", "Car"),
};

const DELIVERY = {
  ships: createOption("ships", "Ships"),
  pickUp: createOption("pickUp", "PickUp"),
};

export const COLOR = {
  red: createOption("red", "Red"),
  green: createOption("green", "Green"),
};

export const INVOICE = {
  post: createOption("post", "Post"),
  email: createOption("email", "Email"),
};

const extractValues = (options: Record<string, Option>): [string] =>
  Object.values(options).map((item) => item.value) as [string];

const companies = extractValues(COMPANY);
const products = extractValues(PRODUCT);
const deliveries = extractValues(DELIVERY);

const createEnumSchema = (values: [string], errorMsg: string) =>
  z.enum(values, {
    errorMap: (error) => ({
      message: error.code === "invalid_type" ? errorMsg : errorMsg,
    }),
  });

export const stepSixSchema = z.object({
  userType: z.string({ required_error: "ユーザータイプを選択してください" }),
  company: createEnumSchema(companies, "会社名を選択してください"),
  branchName: z.string().optional(),
  product: createEnumSchema(products, "商品を選択してくてください"),
  delivery: createEnumSchema(deliveries, "配送オプションを選択してください"),
  color: z.string().optional(),
  memo: z
    .string()
    .max(400, { message: "400字以内で入力してください" })
    .optional(),
  invoice: z.string({ required_error: "請求方法を選択してください" }),
});

type StepSixFormValues = z.infer<typeof stepSixSchema>;

export function StepSix() {
  const [selectedCompany, setSelectedCompany] =
    useState<StepSixFormValues["company"]>("companyA");
  const [branchName, setBranchName] = useState<
    Record<StepSixFormValues["company"], string>
  >({
    companyA: "",
    companyB: "",
    companyC: "",
  });
  const [productImage, setProductImage] = useState<string>("");

  const form = useForm<StepSixFormValues>({
    resolver: zodResolver(stepSixSchema),
    defaultValues: {
      userType: USER_TYPE.personal.value,
      company: COMPANY.companyA.value,
      color: COLOR.red.value,
      invoice: INVOICE.post.value,
    },
  });

  const onProductChange = async (value: string) => {
    const delivery: string | undefined = form.getValues("delivery");
    form.resetField("product");
    form.setValue("product", value);

    // プロダクトを変更したときに、そのプロダクトに応じた画像URLを用意する
    const flowerUrl =
      "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80";
const pcUrl = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
    if (value === PRODUCT.flower.value) setProductImage(flowerUrl);
    if (value === PRODUCT.pc.value) setProductImage(pcUrl);
    // todo あとでスイッチ分にする。
    // todo 別関数に切り出しす

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

  const onSubmit = (data: StepSixFormValues) => {
    toast({
      title: "送信した値",
      variant: "info",
      description:
        data.userType === USER_TYPE.company.value ? (
          <div>
            <p>company: {data.company}</p>
            <p>branchName: {data.branchName}</p>
            <p>product: {data.product}</p>
            <p>
              color: {data.product === PRODUCT.flower.value ? data.color : ""}
            </p>
            <p>delivery: {data.delivery}</p>
            <p>invoice: {data.invoice}</p>
          </div>
        ) : (
          <div>
            <p>userType: {data.userType}</p>
            <p>product: {data.product}</p>
            <p>
              color: {data.product === PRODUCT.flower.value ? data.color : ""}
            </p>
            <p>delivery: {data.delivery}</p>
            <p>memo: {data.memo}</p>
          </div>
        ),
    });
  };

  const onSelectDisabled = (value: string) => {
    const product = form.getValues("product");
    return product === PRODUCT.car.value && value === DELIVERY.ships.value;
  };

  const onCompanyChange = (value: string) => {
    const companyValue = value;

    // 会社名の切り替え
    setSelectedCompany(companyValue);
    form.setValue("company", companyValue);

    // 会社名に紐づく支店名の切り替え
    form.setValue("branchName", branchName[companyValue]);
  };

  const onBranchNameChange = (value: string) => {
    form.setValue("branchName", value);
    setBranchName({ ...branchName, [selectedCompany]: value });
  };

  return (
    <StepSixFormPresenter
      form={form}
      onSubmit={onSubmit}
      onValueChange={onProductChange}
      onSelectDisabled={onSelectDisabled}
      onCompanyChange={onCompanyChange}
      onBranchNameChange={onBranchNameChange}
      productImage={productImage}
      USER_TYPE={USER_TYPE}
      COMPANY={COMPANY}
      PRODUCT={PRODUCT}
      DELIVERY={DELIVERY}
      COLOR={COLOR}
      INVOICE={INVOICE}
    />
  );
}
