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
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { stepSixSchema } from "../";

type Props = {
  isRequired: boolean;
  form: UseFormReturn<z.infer<typeof stepSixSchema>>;
  onChange?: (value: string) => void;
  name: keyof z.infer<typeof stepSixSchema>;
  label: string; // 会社名
  placeholder: string; // 株式会社サンプル
  description: string; // 会社名を入力してください
};
export const InputFormFieldPresenter = ({
  isRequired,
  form,
  onChange,
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
            <Input
              placeholder={placeholder}
              {...field}
              className={"bg-white"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                onChange && onChange(value);
              }}
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
