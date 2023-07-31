"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { MatchingFormPresenter } from "./index.presenter";

export const prefectures = [
  { id: 1, prefecture: "北海道" },
  { id: 2, prefecture: "青森県" },
  { id: 3, prefecture: "岩手県" },
  { id: 4, prefecture: "宮城県" },
  { id: 5, prefecture: "秋田県" },
  { id: 6, prefecture: "山形県" },
  { id: 7, prefecture: "福島県" },
  { id: 8, prefecture: "茨城県" },
  { id: 9, prefecture: "栃木県" },
  { id: 10, prefecture: "群馬県" },
  { id: 11, prefecture: "埼玉県" },
  { id: 12, prefecture: "千葉県" },
  { id: 13, prefecture: "東京都" },
  { id: 14, prefecture: "神奈川県" },
  { id: 15, prefecture: "新潟県" },
  { id: 16, prefecture: "富山県" },
  { id: 17, prefecture: "石川県" },
  { id: 18, prefecture: "福井県" },
  { id: 19, prefecture: "山梨県" },
  { id: 20, prefecture: "長野県" },
  { id: 21, prefecture: "岐阜県" },
  { id: 22, prefecture: "静岡県" },
  { id: 23, prefecture: "愛知県" },
  { id: 24, prefecture: "三重県" },
  { id: 25, prefecture: "滋賀県" },
  { id: 26, prefecture: "京都府" },
  { id: 27, prefecture: "大阪府" },
  { id: 28, prefecture: "兵庫県" },
  { id: 29, prefecture: "奈良県" },
  { id: 30, prefecture: "和歌山県" },
  { id: 31, prefecture: "鳥取県" },
  { id: 32, prefecture: "島根県" },
  { id: 33, prefecture: "岡山県" },
  { id: 34, prefecture: "広島県" },
  { id: 35, prefecture: "山口県" },
  { id: 36, prefecture: "徳島県" },
  { id: 37, prefecture: "香川県" },
  { id: 38, prefecture: "愛媛県" },
  { id: 39, prefecture: "高知県" },
  { id: 40, prefecture: "福岡県" },
  { id: 41, prefecture: "佐賀県" },
  { id: 42, prefecture: "長崎県" },
  { id: 43, prefecture: "熊本県" },
  { id: 44, prefecture: "大分県" },
  { id: 45, prefecture: "宮崎県" },
  { id: 46, prefecture: "鹿児島県" },
  { id: 47, prefecture: "沖縄県" },
] as const;

const requiredErr = { required_error: "必須項目です" };
export const schema = z.object({
  thumbnail: z.string(requiredErr).url({ message: "写真を設定してください" }),
  companyName: z.string(requiredErr).min(1, {
    message: "会社名の入力は必須です",
  }),
  presidentName: z.string(requiredErr).min(1, {
    message: "代表名の入力は必須です",
  }),
  companyAddress: z.string(requiredErr).min(1, {
    message: "会社住所の入力は必須です",
  }),
  bizHours: z.string(requiredErr).min(1, {
    message: "営業時間の入力は必須です",
  }),
  fees: z.string(requiredErr).min(1, {
    message: "料金の入力は必須です",
  }),
  activityPrefecture: z
    .array(z.string(), requiredErr)
    .refine((value) => value.some((item) => item), {
      message: "一つ以上の都道府県を選択してください",
    }),
  activityArea: z.string().min(1, {
    message: "活動エリアの入力は必須です",
  }),
  contactEmail: z
    .string()
    .email({
      message: "メールアドレスの形式が誤っています",
    })
    .optional(),
  contactTel: z
    .string()
    .regex(/^[+-]?\d*\.?\d+$/, { message: "電話番号の形式が誤っています" })
    .transform(Number)
    .optional(),
  companyURL: z
    .string(requiredErr)
    .url({
      message: "URLの形式が誤っています",
    })
    .optional(),
  qualification: z
    .array(z.string())
    .refine((value) => value.some((item) => item))
    .optional(),
  equipment: z
    .array(z.string())
    .refine((value) => value.some((item) => item))
    .optional(),
  messageToUsers: z.string(requiredErr).min(1, {
    message: "ユーザーへのメッセージの入力は必須です",
  }),
});

export type FormValues = z.infer<typeof schema>;

export const NursingTaxiForm = () => {
  const form: UseFormReturn<FormValues> = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return <MatchingFormPresenter form={form} onSubmit={onSubmit} />;
};
