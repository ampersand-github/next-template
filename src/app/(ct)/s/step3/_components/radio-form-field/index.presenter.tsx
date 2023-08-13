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
import { Option, stepThreeSchema } from "../index";

type Props = {
  form: UseFormReturn<z.infer<typeof stepThreeSchema>>;
  name: keyof z.infer<typeof stepThreeSchema>;
  label: string;
  description: string;
  options: Record<string, Option>;
};

export const RadioFormFieldPresenter = ({
  form,
  name,
  label,
  description,
  options,
}: Props) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <RadioGroup
            defaultValue={field.value}
            value={field.value}
            defaultChecked={true}
            onValueChange={field.onChange}
          >
            {Object.values(options).map((option: Option) => (
              <div key={option.id} className="flex items-center space-x-2">
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
