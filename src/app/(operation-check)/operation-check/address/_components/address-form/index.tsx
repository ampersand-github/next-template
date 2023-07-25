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
import { useToast } from "@/__shared__/components/ui/use-toast";
import { IFindOneAddressResponse } from "@/backend/address/use-case/find-one-address/response-interface";
import { env } from "@/env.mjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { atom, useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { addressFormSchema } from "./address-form-schema";
import { IAddress } from "./address-interface";
import { AddressSelectDialog } from "./address-select-dialog";
import { fetchCandidateAddress } from "./fetch-candidate-address";
import { initialAddress } from "./initial-address";
import { isNumeric } from "./is-numeric";

export const selectedAddressAtom = atom<IAddress>(initialAddress);
export const candidateAddressAtom = atom<[IAddress, ...IAddress[]]>([
  initialAddress,
]);
export const isAddressSelectDialogOpenAtom = atom(false);

export const AddressForm = () => {
  const url = `${env.NEXT_PUBLIC_ORIGIN}/api/address`;
  const [_, setIsOpen] = useAtom(isAddressSelectDialogOpenAtom);
  const [candidate, setCandidate] = useAtom(candidateAddressAtom);
  const [selectedAddress] = useAtom(selectedAddressAtom);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: initialAddress,
  });

  useEffect(() => {
    form.setValue("prefecture", selectedAddress?.prefecture || "");
    form.setValue("city", selectedAddress?.city || "");
    form.setValue("town", selectedAddress?.town || "");
  }, [form, selectedAddress]);

  const autofillFromZipcode = async (postalCode: string) => {
    setIsLoading(true);
    const results = await fetchCandidateAddress(postalCode);
    if (results.length === 1) {
      form.setValue("prefecture", results[0].prefecture);
      form.setValue("city", results[0].city);
      form.setValue("town", results[0].town);
    }
    // メモ：029-4205は複数件ある
    if (results.length >= 2) {
      setCandidate([results[0], ...results.slice(1)]);
      setIsOpen(true);
      // ここでダイアログが開く
      // 選択すると自動でフォームに入力される
    }

    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) {
        const json = await response.json();
        toast({ description: json.message, variant: "error" });
        throw new Error(json.message);
      }
      const json: IFindOneAddressResponse = await response.json();
      form.setValue("postalCode", json.postalCode);
      form.setValue("prefecture", json.prefecture);
      form.setValue("city", json.city);
      form.setValue("town", json.town);
      form.setValue("block", json.block);
    })();
  }, [form, toast, url]);

  const onSubmit = async (values: z.infer<typeof addressFormSchema>) => {
    const props = {
      postalCode: values.postalCode,
      prefecture: values.prefecture,
      city: values.city,
      town: values.town,
      block: values.block,
    };
    const body = JSON.stringify(props);
    const response = await fetch(url, { method: "POST", body: body });
    if (!response.ok) {
      const json = await response.json();
      toast({ description: json.message, variant: "error" });
      throw new Error(json.message);
    }
    const json = await response.json();
    toast({ description: json.message, variant: "success" });
  };

  return (
    <Form {...form}>
      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="r-2 h-8 w-8 animate-spin " />
        </div>
      ) : (
        <>
          <AddressSelectDialog items={candidate} />
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
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
                      placeholder="1234567"
                      maxLength={7}
                      {...field}
                      /*
                       * 以下のワーニングがでるので、その対策としてvalue={field.value || ""}を追加した
                       * ちなみにこれを追加すると、最初の入力で文字が入力できるバグがなくなる。
                       * Warning: A component is changing an uncontrolled input to be controlled.
                       * This is likely caused by the value changing from undefined to a defined value,
                       * which should not happen.
                       * Decide between using a controlled or uncontrolled input element for the lifetime of the component.
                       */
                      value={field.value || ""}
                      onChange={async (
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        if (isNumeric(e.target.value)) {
                          // 数値のみ反映させる
                          field.onChange(e.target.value);
                          // 7字になったら郵便番号を検索する
                          if (e.target.value.length === 7)
                            await autofillFromZipcode(e.target.value);
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
                      placeholder="千代田マンション101号室"
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
        </>
      )}
    </Form>
  );
};
