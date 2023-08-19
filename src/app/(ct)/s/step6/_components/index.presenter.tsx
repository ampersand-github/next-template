import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/__shared__/components/ui/accordion";
import { Button } from "@/__shared__/components/ui/button";
import { Form } from "@/__shared__/components/ui/form";
import Image from "next/image";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { stepSixSchema } from ".";
import { Option } from "./index";
import { InputFormFieldPresenter } from "./input-form-fild";
import { RadioFormFieldPresenter } from "./radio-form-field";
import { SelectFormFieldPresenter } from "./select-form-field";
import { TextAreaFormFiledPresenter } from "./textarea-form-fild";

type Props = {
  form: UseFormReturn<z.infer<typeof stepSixSchema>>;
  onSubmit: (data: z.infer<typeof stepSixSchema>) => void;
  onValueChange?: (value: string) => void;
  onSelectDisabled?: (value: string) => boolean;
  onCompanyChange?: (value: string) => void;
  onBranchNameChange?: (value: string) => void;
  productImage?: string;
  USER_TYPE: Record<string, Option>;
  COMPANY: Record<string, Option>;
  PRODUCT: Record<string, Option>;
  DELIVERY: Record<string, Option>;
  COLOR: Record<string, Option>;
  INVOICE: Record<string, Option>;
};

export const StepSixFormPresenter = ({
  form,
  onSubmit,
  onValueChange,
  onSelectDisabled,
  onCompanyChange,
  onBranchNameChange,
                                       productImage,
  USER_TYPE,
  COMPANY,
  PRODUCT,
  DELIVERY,
  COLOR,
  INVOICE,
}: Props) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const _SelectFormFieldPresenter = (
    <SelectFormFieldPresenter
      form={form}
      name={"product"}
      label={"商品"}
      placeholder={"-- Please choose a product --"}
      description={"商品を選択してください"}
      options={PRODUCT}
      onValueChange={onValueChange}
      isRequired={true}
    />
  );
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <Image
          src={productImage ?? ""}
          alt={"flower"}
          width={700}
          height={400}
        />

        <Accordion
          type="single"
          collapsible
          onValueChange={(e: string) => {
            e ? setIsAccordionOpen(true) : setIsAccordionOpen(false);
          }}
        >
          <AccordionItem value="form-item">
            <div>
              <div
                className={
                  "flex flex-row items-center justify-items-start space-x-8"
                }
              >
                <h6>Order Form</h6>
                <p className={"text-muted-foreground"}>
                  {form.getValues("userType")}
                </p>
                <AccordionTrigger className={"border-2"}></AccordionTrigger>
              </div>

              {!isAccordionOpen && _SelectFormFieldPresenter}
            </div>

            <AccordionContent className={""}>
              <RadioFormFieldPresenter
                form={form}
                name={"userType"}
                label={"ユーザータイプ"}
                description={"ユーザータイプを選択してください"}
                options={USER_TYPE}
                direction={"row"}
                isRequired={true}
              />

              {form.getValues("userType") === USER_TYPE.company.value && (
                <>
                  <SelectFormFieldPresenter
                    form={form}
                    name={"company"}
                    label={"会社名"}
                    placeholder={"-- Please choose a company --"}
                    description={"会社名を選択してください"}
                    options={COMPANY}
                    onValueChange={onCompanyChange}
                    isRequired={true}
                  />
                  <InputFormFieldPresenter
                    form={form}
                    name={"branchName"}
                    label={"部署名"}
                    onChange={onBranchNameChange}
                    placeholder={"部署名を入力してください"}
                    description={"部署名を入力してください"}
                    isRequired={false}
                  />
                </>
              )}

              {_SelectFormFieldPresenter}

              {form.getValues("product") === PRODUCT.flower.value && (
                <RadioFormFieldPresenter
                  form={form}
                  name={"color"}
                  label={"フラワーカラー"}
                  description={"フラワーカラーを選択してください"}
                  options={COLOR}
                  direction={"column"}
                  isRequired={true}
                />
              )}

              <SelectFormFieldPresenter
                form={form}
                name={"delivery"}
                label={"配送オプション"}
                placeholder={"-- Please choose a delivery --"}
                description={"配送オプションを選択してください"}
                options={DELIVERY}
                onSelectDisabled={onSelectDisabled}
                isRequired={true}
              />

              {form.getValues("userType") === USER_TYPE.personal.value && (
                <TextAreaFormFiledPresenter
                  form={form}
                  name={"memo"}
                  label={"メモ"}
                  placeholder={"メモを入力してください"}
                  description={"メモを入力してください"}
                  isRequired={false}
                />
              )}

              {form.getValues("userType") === USER_TYPE.company.value && (
                <RadioFormFieldPresenter
                  form={form}
                  name={"invoice"}
                  label={"インボイス"}
                  description={"インボイスを選択してください"}
                  options={INVOICE}
                  direction={"row"}
                  isRequired={true}
                />
              )}

              <Button type="submit">送信する</Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </Form>
  );
};
