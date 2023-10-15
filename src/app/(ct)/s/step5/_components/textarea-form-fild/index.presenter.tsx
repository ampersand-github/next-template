import { OptionalLabel } from "@/__shared__/components/original/optional-label";
import { RequiredLabel } from "@/__shared__/components/original/required-label";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/__shared__/components/ui/form";
import { Textarea } from "@/__shared__/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { stepFiveSchema } from "..";

type Props = {
  isRequired: boolean;
  form: UseFormReturn<z.infer<typeof stepFiveSchema>>;
  name: keyof z.infer<typeof stepFiveSchema>; // companyName
  label: string; // 会社名
  placeholder: string; // 株式会社サンプル
  description: string; // 会社名を入力してください
};
export const TextAreaFormFiledPresenter = ({
  isRequired,
  form,
  name,
  label,
  placeholder,
  description,
}: Props) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={"flex flex-row items-center space-x-2"}>
            <p>{label}</p>
            {isRequired ? <RequiredLabel /> : <OptionalLabel />}
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
              className={"bg-white"}
            />
          </FormControl>
          <FormDescription className={"whitespace-pre-wrap"}>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
