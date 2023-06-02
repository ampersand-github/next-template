"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { atom, useAtom } from "jotai";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AddressSelectDialog } from "./address-select-dialog";

export const selectedAddressAtom = atom<AddressProps>({
  prefecture: "",
  city: "",
  town: "",
});
export const candidateAddressAtom = atom<[AddressProps, ...AddressProps[]]>([
  {
    prefecture: "",
    city: "",
    town: "",
  },
  {
    prefecture: "",
    city: "",
    town: "",
  },
]);
export const isAddressSelectDialogOpenAtom = atom(false);

export type AddressProps = {
  prefecture: string;
  city: string;
  town: string;
};
const formSchema = z.object({
  postalCode: z
    .string({ required_error: "郵便番号を入力してください" })
    .min(7, { message: "郵便番号は7桁で入力してください" }),
  prefecture: z.string({ required_error: "都道府県を入力してください" }),
  city: z.string({ required_error: "都道府県を入力してください" }),
  town: z.string({ required_error: "都道府県を入力してください" }),
  block: z.string().optional(),
});

export const AddressForm = () => {
  const [_, setIsOpen] = useAtom(isAddressSelectDialogOpenAtom);
  const [candidate, setCandidate] = useAtom(candidateAddressAtom);
  const [selectedAddress] = useAtom(selectedAddressAtom);
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postalCode: "",
      prefecture: "",
      city: "",
      town: "",
      block: "",
    },
  });

  useEffect(() => {
    if (
      selectedAddress.prefecture === "" &&
      selectedAddress.city === "" &&
      selectedAddress.town === ""
    )
      return;
    console.log(selectedAddress);
    form.setValue("prefecture", selectedAddress.prefecture);
    form.setValue("city", selectedAddress.city);
    form.setValue("town", selectedAddress.town);
  }, [form, selectedAddress]);

  const autofillFromZipcode = async (postalCode: string) => {
    setIsLoading(true);
    const url = "https://zipcloud.ibsnet.co.jp/api/search";
    const response = await fetch(`${url}?zipcode=${postalCode}`);
    const { results } = await response.json();
    console.log(results);
    if (results.length === 1) {
      const { address1, address2, address3 } = results[0];
      form.setValue("prefecture", address1);
      form.setValue("city", address2);
      form.setValue("town", address3);
    }
    // 029-4205
    if (results.length >= 2) {
      console.log("results", results);
      const jsonedList = results.map((result: any) => {
        const { address1, address2, address3 } = result;
        return {
          prefecture: address1,
          city: address2,
          town: address3,
        };
      });
      setCandidate(jsonedList);
      setIsOpen(true);
    }

    setIsLoading(false);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return (
    <Form {...form}>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <AddressSelectDialog items={candidate} />
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>郵便番号</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  autoComplete="postal-code"
                  inputMode="numeric"
                  placeholder="1112345"
                  maxLength={7}
                  {...field}
                  onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    const onlyNumberRegex = new RegExp(/^[0-9]*$/);
                    if (onlyNumberRegex.test(value)) {
                      // 数値のみ反映させる
                      field.onChange(value);
                      // 7字になったら郵便番号を検索する
                      if (value.length === 7) await autofillFromZipcode(value);
                    }
                  }}
                />
              </FormControl>
              <FormDescription>郵便番号の入力は必須です</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prefecture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>都道府県</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  autoComplete="address-level1"
                  placeholder="東京都"
                  maxLength={4}
                  {...field}
                />
              </FormControl>
              <FormDescription>都道府県の入力は必須です</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>市区町村</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  autoComplete="address-level2"
                  placeholder="千代田区"
                  maxLength={80}
                  {...field}
                />
              </FormControl>
              <FormDescription>市区町村の入力は必須です</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="town"
          render={({ field }) => (
            <FormItem>
              <FormLabel>町名以下</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  autoComplete="address-level3"
                  placeholder="千代田一丁目一番地"
                  maxLength={80}
                  {...field}
                />
              </FormControl>
              <FormDescription>町名以下の入力は必須です</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="block"
          render={({ field }) => (
            <FormItem>
              <FormLabel>建物名・階層・部屋情報</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  autoComplete="address-level4"
                  placeholder=""
                  maxLength={120}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
