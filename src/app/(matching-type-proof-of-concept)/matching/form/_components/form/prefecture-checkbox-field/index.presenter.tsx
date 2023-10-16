import { OptionalLabel } from "@/__shared__/components/original/optional-label";
import { RequiredLabel } from "@/__shared__/components/original/required-label";
import { Checkbox } from "@/__shared__/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/__shared__/components/ui/form";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Control } from "react-hook-form";
import { FormValues, prefectures } from "../index";

type Props = {
  isRequired: boolean;
  control: Control<FormValues>;
  description: string;
  label: string;
  name: keyof FormValues;
};
export const PrefectureCheckboxFieldPresenter = ({
  isRequired,
  control,
  name,
  label,
  description,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel className={"flex flex-row items-center space-x-2"}>
            <p>{label}</p>
            {isRequired ? <RequiredLabel /> : <OptionalLabel />}
          </FormLabel>
          <div
            className={
              "flex flex-row flex-wrap justify-start rounded-md bg-white"
            }
          >
            {(prefectures || []).map((item) => (
              <FormField
                key={item.id}
                control={control}
                name={name}
                render={({ field }) => {
                  const toStringArray = (
                    value: string | number | undefined | string[]
                  ): string[] => {
                    if (typeof value === "string") return [value];
                    if (typeof value === "number") return [String(value)];
                    if (value === undefined) return [];
                    return value;
                  };
                  const handleChange = (checked: CheckedState): void => {
                    const value = toStringArray(field.value);
                    checked
                      ? field.onChange(value.concat(item.prefecture))
                      : field.onChange(
                          value.filter(
                            (value: string): boolean =>
                              value !== item.prefecture
                          )
                        );
                  };
                  return (
                    <FormItem key={item.id} className={"p-2 "}>
                      <div className={"flex items-center space-x-1 "}>
                        <FormControl>
                          <Checkbox
                            checked={toStringArray(field.value).includes(
                              item.prefecture
                            )}
                            onCheckedChange={handleChange}
                          />
                        </FormControl>
                        <FormLabel>{item.prefecture}</FormLabel>
                      </div>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          <FormDescription className={"whitespace-pre-wrap"}>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
