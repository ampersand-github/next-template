"use client";

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
import { Input } from "@/__shared__/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z
    .string({ required_error: "名前の入力は必須です" })
    .max(60, { message: "名前は60字までです" }),
  age: z
    .number({ required_error: "年齢の入力は必須です" })
    .min(18, { message: "未成年は登録できません" })
    .max(125, { message: "存在しない年齢は入力できません" }),
});

/**
 *
 * @package
 */
export const AgeForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: 0, // 数値以外の値を入力させないために初期値を設定する
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>名前</FormLabel>
              <FormControl>
                <Input type="text" placeholder="田中太郎" {...field} />
              </FormControl>
              <FormDescription>
                名前はフォローされたユーザーに表示されます
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>年齢</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="20"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    const onlyNumberRegex = new RegExp(/^[0-9]*$/);
                    if (onlyNumberRegex.test(value)) {
                      field.onChange(Number(value));
                    }
                  }}
                />
              </FormControl>
              <FormDescription>年齢は公開されません</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
