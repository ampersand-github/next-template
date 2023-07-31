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
import { Input } from "@/__shared__/components/ui/input";
import { Control } from "react-hook-form";
import { FormValues } from "../index";

type Props = {
  isRequired: boolean;
  control: Control<FormValues>;
  name: keyof FormValues; // companyName
  label: string; // 会社名
  placeholder: string; // 株式会社サンプル
  description: string; // 会社名を入力してください
};
export const InputFormFieldPresenter = ({
  isRequired,
  control,
  name,
  label,
  placeholder,
  description,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={"flex flex-row items-center space-x-2"}>
            <p>{label}</p>
            {isRequired ? <RequiredLabel /> : <OptionalLabel />}
          </FormLabel>
          <FormControl>
            <Input
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
