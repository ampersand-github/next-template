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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/__shared__/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Option, stepSixSchema } from "../";

type Props = {
  form: UseFormReturn<z.infer<typeof stepSixSchema>>;
  name: keyof z.infer<typeof stepSixSchema>;
  label: string;
  placeholder: string;
  description: string;
  options: Record<string, Option>;
  onValueChange?: (value: string) => void;
  onSelectDisabled?: (value: string) => boolean;
  isRequired: boolean;
};

export const SelectFormFieldPresenter = ({
  form,
  name,
  label,
  placeholder,
  description,
  options,
  onValueChange,
  onSelectDisabled,
  isRequired,
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
          <Select
            onValueChange={onValueChange || field.onChange}
            value={field.value}
            defaultValue={field.value}
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
                <SelectItem
                  key={option.value}
                  value={option.value}
                  defaultValue={option.value}
                  disabled={
                    onSelectDisabled ? onSelectDisabled(option.value) : false
                  }
                >
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
