import * as z from "zod";

export const addressFormSchema = z.object({
  postalCode: z
    .string({ required_error: "郵便番号を入力してください" })
    .min(7, { message: "郵便番号は7桁で入力してください" }),
  prefecture: z.string({ required_error: "都道府県を入力してください" }),
  city: z.string({ required_error: "都道府県を入力してください" }),
  town: z.string({ required_error: "都道府県を入力してください" }),
  block: z.string().optional(),
});
