import { OptionalLabel } from "@/__shared__/components/original/optional-label";
import { RequiredLabel } from "@/__shared__/components/original/required-label";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/__shared__/components/ui/form";
import { Label } from "@/__shared__/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/__shared__/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Option, stepSixSchema } from "../";

type Props = {
  form: UseFormReturn<z.infer<typeof stepSixSchema>>;
  name: keyof z.infer<typeof stepSixSchema>;
  label: string;
  description: string;
  options: Record<string, Option>;
  direction: "row" | "column";
  isRequired: boolean;
};

export const RadioFormFieldPresenter = ({
  form,
  name,
  label,
  description,
  options,
  direction,
  isRequired,
}: Props) => {
  const row = "flex flex-row";
  const column = "flex flex-col ";
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
          <RadioGroup
            className={direction === "row" ? row : column}
            defaultValue={field.value}
            value={field.value}
            defaultChecked={true}
            onValueChange={field.onChange}
          >
            {Object.values(options).map((option: Option) => (
              <div key={option.id} className={"flex space-x-1 "}>
                <RadioGroupItem
                  defaultValue={field.value}
                  value={option.id}
                  id={option.id}
                />
                <Label htmlFor={option.id}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>

          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
