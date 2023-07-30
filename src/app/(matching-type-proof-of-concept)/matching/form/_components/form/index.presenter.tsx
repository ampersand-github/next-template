import { Button } from "@/__shared__/components/ui/button";
import { Checkbox } from "@/__shared__/components/ui/checkbox";
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
import { CheckedState } from "@radix-ui/react-checkbox";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { FormValues, prefectures, schema } from "./index";
import { InputFormFieldPresenter } from "./input-form-fild";
import { TagInputFormFieldPresenter } from "./tag-input-form-field";
import { TextAreaFormFiledPresenter } from "./textarea-form-fild";

type Props = {
  form: UseFormReturn<FormValues>;
  onSubmit: (values: z.infer<typeof schema>) => void;
};

export const MatchingFormPresenter = ({ form, onSubmit }: Props) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>写真</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                会社の顔になる写真をアップロードしてください
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <InputFormFieldPresenter
          control={form.control}
          name={"companyName"}
          label={"会社名"}
          placeholder={"株式会社介護タクシー"}
          description={"会社名を入力してください"}
        />
        <InputFormFieldPresenter
          control={form.control}
          name={"presidentName"}
          label={"代表者名"}
          placeholder={"田中 大吾"}
          description={"代表者名を入力してください"}
        />
        <InputFormFieldPresenter
          control={form.control}
          name={"companyAddress"}
          label={"会社住所"}
          placeholder={"東京都千代田区1-1-1"}
          description={"会社の住所を入力してください"}
        />
        <TextAreaFormFiledPresenter
          control={form.control}
          name={"bizHours"}
          label={"営業時間"}
          placeholder={`■ 月〜金：9:00 〜 18:00\n■ 定休日：土日祝日\n※営業時間外は応相談`}
          description={"営業時間を入力してください"}
        />

        <InputFormFieldPresenter
          control={form.control}
          name={"contactEmail"}
          label={"メールアドレス(あれば)"}
          placeholder={"sample@gmail.com"}
          description={"メールアドレスを入力してください"}
        />
        <InputFormFieldPresenter
          control={form.control}
          name={"contactTel"}
          label={"電話番号(あれば)"}
          placeholder={"090-1234-5678"}
          description={"電話番号を入力してください"}
        />

        <TextAreaFormFiledPresenter
          control={form.control}
          name={"fees"}
          label={"料金"}
          placeholder={`あとでてきとうに料金を書く`} // todo あとでてきとうに料金を書く
          description={"営業時間を入力してください"}
        />

        <FormField
          control={form.control}
          name="activityPrefecture"
          render={() => (
            <FormItem>
              <FormLabel>活動している都道府県</FormLabel>
              <div
                className={
                  "flex flex-row flex-wrap justify-start rounded-md bg-white"
                }
              >
                {prefectures.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="activityPrefecture"
                    render={({ field }) => {
                      const handleChange = (checked: CheckedState): void =>
                        checked
                          ? field.onChange([
                              ...(field.value || []),
                              item.prefecture,
                            ])
                          : field.onChange(
                              field.value?.filter(
                                (value: string): boolean =>
                                  value !== item.prefecture
                              )
                            );
                      return (
                        <FormItem key={item.id} className={"p-2 "}>
                          <div className={"flex items-center space-x-1 "}>
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.prefecture)}
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
                活動している都道府県を選択してください
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <TextAreaFormFiledPresenter
          control={form.control}
          name={"activityArea"}
          label={"活動地域"}
          placeholder={`東京23区と埼玉県を中心に活動しています`}
          description={`活動地域を書いてください`}
        />

        <TagInputFormFieldPresenter
          control={form.control}
          name={"qualification"}
          label={"資格"}
          placeholder={"介護福祉士、看護師、救急救命士、ドライバーなど"}
          description={`利用者から見て魅力的な資格を左から順に書いてください\n資格を「、」を区切りにして入力してください`}
        />

        <TagInputFormFieldPresenter
          control={form.control}
          name={"equipment"}
          label={"備品"}
          placeholder={"ストレッチャー、車イス、松葉杖など"}
          description={`利用者から見て魅力的な備品を左から順に書いてください\n備品を「、」を区切りにして入力してください`}
        />
        <TextAreaFormFiledPresenter
          control={form.control}
          name={"companyDescription"}
          label={"当社について"}
          placeholder={`あとでてきとうにを書く`} // todo あとでてきとうに料金を書く
          description={`会社の特徴を書いてください\n 例えば、活動地域、当社の強み、など`}
        />
        <TextAreaFormFiledPresenter
          control={form.control}
          name={"messageToUsers"}
          label={"利用者の方へのメッセージ"}
          placeholder={`あとでてきとうに料金を書く`} // todo あとでてきとうに料金を書く
          description={"営業時間を入力してください"}
        />

        <Button type="submit" className={"w-full"}>
          登録する
        </Button>
      </form>
    </Form>
  );
};
