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
import { useState } from "react";
import { Control } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";
import { FormValues } from "../index";

type Props = {
  isRequired: boolean;
  control: Control<FormValues>;
  name: keyof FormValues; // companyName
  label: string; // 会社名
  placeholder: string; // 株式会社サンプル
  description: string; // 会社名を入力してください
};

export const TagInputFormFieldPresenter = ({
  isRequired,
  name,
  control,
  label,
  placeholder,
  description,
}: Props) => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className={"flex flex-row items-center space-x-2"}>
              <p>{label}</p>
              {isRequired ? <RequiredLabel /> : <OptionalLabel />}
            </FormLabel>
            <FormControl>
              <TagsInput
                value={selected || [""]}
                onChange={(item) => {
                  setSelected(item);
                  field.onChange(...(item || []));
                }}
                name={name}
                placeHolder={placeholder}
                separators={[",", "、"]}
              />
            </FormControl>
            <FormDescription className={"whitespace-pre-wrap"}>
              {description}
            </FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
