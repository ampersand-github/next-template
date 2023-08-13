import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/__shared__/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/__shared__/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { Option, stepOneSchema } from "../index";
import { z } from "zod";

type Props = {
  form: UseFormReturn<z.infer<typeof stepOneSchema>>;
  name: keyof z.infer<typeof stepOneSchema>;
  label: string;
  placeholder: string;
  description: string;
  options: Record<string, Option>;
  onValueChange?: (value: string) => void;
};

export const SelectFormFieldPresenter = ({
  form,
  name,
  label,
  placeholder,
  description,
  options,
  onValueChange,
}: Props) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={onValueChange || field.onChange}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    <p className={"text-muted-foreground"}>{placeholder}</p>
                  }
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.values(options).map((option: Option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
