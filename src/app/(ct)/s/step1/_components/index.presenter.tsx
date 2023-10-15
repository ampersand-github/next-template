import { Button } from "@/__shared__/components/ui/button";
import { Form } from "@/__shared__/components/ui/form";
import { Option, stepOneSchema } from "@/app/(ct)/s/step1/_components/index";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { SelectFormFieldPresenter } from "./select-form-field";

type Props = {
  form: UseFormReturn<z.infer<typeof stepOneSchema>>;
  onSubmit: (data: z.infer<typeof stepOneSchema>) => void;
  onValueChange?: (value: string) => void;
  PRODUCT: Record<string, Option>;
  DELIVERY: Record<string, Option>;
};

export function Step1FormPresenter({
  form,
  onSubmit,
  onValueChange,
  PRODUCT,
  DELIVERY,
}: Props) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8"
      >
        <SelectFormFieldPresenter
          form={form}
          name={"product"}
          label={"商品"}
          placeholder={"-- Please choose a product --"}
          description={"商品を選択してください"}
          options={PRODUCT}
          onValueChange={onValueChange}
        />
        <SelectFormFieldPresenter
          form={form}
          name={"delivery"}
          label={"配送オプション"}
          placeholder={"-- Please choose a delivery --"}
          description={"配送オプションを選択してください"}
          options={DELIVERY}
        />

        <Button type="submit" disabled={!form.formState.isValid}>
          送信する
        </Button>
      </form>
    </Form>
  );
}
