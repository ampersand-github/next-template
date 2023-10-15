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
import { Option, stepFourSchema } from "../index";

type Props = {
  form: UseFormReturn<z.infer<typeof stepFourSchema>>;
  name: keyof z.infer<typeof stepFourSchema>;
  label: string;
  description: string;
  options: Record<string, Option>;
  direction: "row" | "column";
};

export const RadioFormFieldPresenter = ({
  form,
  name,
  label,
  description,
  options,
  direction,
}: Props) => {
  const row = "flex flex-row";
  const column = "flex flex-col ";
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

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
