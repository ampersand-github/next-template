import { Button } from "@/__shared__/components/ui/button";
import {
  Form,
  FormControl,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/__shared__/components/ui/select";
import { Color, DELIVERY, PRODUCT } from ".";

type Props = {
  onSubmit: (data: any) => void;
  form: any;
  onProductChange: (value: any) => void;
};

export const Step1Presenter = ({ onSubmit, form, onProductChange }: Props) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="product"
          render={({ field }) => (
            <FormItem id={"product"} itemID={"product"}>
              <FormLabel htmlFor="product">商品</FormLabel>
              <Select
                name={"product"}
                onValueChange={onProductChange}
                defaultValue={field.value}
              >
                <FormControl id={"product"}>
                  <SelectTrigger
                    aria-label={"select-product"}
                    id={"product"}
                    name={"product"}
                  >
                    <SelectValue placeholder="Product" id={"product"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PRODUCT.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>商品を選択してください</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>オプション</FormLabel>
              {form.getValues("product") === "Flower" && (
                <RadioGroup
                  defaultValue="option-one"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  {Color.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={item.id} id={item.id} />
                      <Label htmlFor={item.id}>{item.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              <FormDescription>オプションを選択してください</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="delivery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>オプション</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger aria-label={"select-option"}>
                    <SelectValue placeholder="-- Please choose an option--" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {DELIVERY.map((item) => (
                    <SelectItem
                      key={item.value}
                      defaultValue={item.value}
                      value={item.value}
                      disabled={
                        form.getValues("product") === "Car" &&
                        item.value === "Ships"
                      }
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>オプションを選択してください</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          aria-label={"submit"}
          type="submit"
          disabled={!form.formState.isValid}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};
