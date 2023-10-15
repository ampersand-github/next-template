import { Button } from "@/__shared__/components/ui/button";
import { Form } from "@/__shared__/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Option, stepThreeSchema } from "./index";
import { RadioFormFieldPresenter } from "./radio-form-field";
import { SelectFormFieldPresenter } from "./select-form-field";

type Props = {
  form: UseFormReturn<z.infer<typeof stepThreeSchema>>;
  onSubmit: (data: z.infer<typeof stepThreeSchema>) => void;
  onValueChange?: (value: string) => void;
  onSelectDisabled?: (value: string) => boolean;
  PRODUCT: Record<string, Option>;
  DELIVERY: Record<string, Option>;
  COLOR: Record<string, Option>;
};

export function StepThreeFormPresenter({
  form,
  onSubmit,
  onValueChange,
  onSelectDisabled,
  PRODUCT,
  DELIVERY,
  COLOR,
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
        {form.getValues("product") === PRODUCT.flower.value && (
          <RadioFormFieldPresenter
            form={form}
            name={"color"}
            label={"フラワーカラー"}
            description={"フラワーカラーを選択してください"}
            options={COLOR}
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
        />
        <Button type="submit" disabled={!form.formState.isValid}>
          送信する
        </Button>
      </form>
    </Form>
  );
}
