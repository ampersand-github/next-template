import { Button } from "@/__shared__/components/ui/button";
import { Form } from "@/__shared__/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Option, stepFourSchema } from ".";
import { RadioFormFieldPresenter } from "./radio-form-field";
import { SelectFormFieldPresenter } from "./select-form-field";

type Props = {
  form: UseFormReturn<z.infer<typeof stepFourSchema>>;
  onSubmit: (data: z.infer<typeof stepFourSchema>) => void;
  onValueChange?: (value: string) => void;
  onSelectDisabled?: (value: string) => boolean;
  USER_TYPE: Record<string, Option>;
  PRODUCT: Record<string, Option>;
  DELIVERY: Record<string, Option>;
  COLOR: Record<string, Option>;
};

export const StepFourFormPresenter = ({
  form,
  onSubmit,
  onValueChange,
  onSelectDisabled,
  USER_TYPE,
  PRODUCT,
  DELIVERY,
  COLOR,
}: Props) => {
  const { isDirty, isValid } = form.formState;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8"
      >
        <RadioFormFieldPresenter
          form={form}
          name={"userType"}
          label={"ユーザータイプ"}
          description={"ユーザータイプを選択してください"}
          options={USER_TYPE}
          direction={"row"}
        />

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
            direction={"column"}
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
        <Button type="submit">送信する</Button>
      </form>
    </Form>
  );
};
