import { z } from "zod";

// HTTPステータスコードの定義
const HttpSuccessStatusCodeType = {
  OK: 200,
  CREATED: 201,
  // todo 必要に応じて適宜追加してください。
} as const;
export type HttpSuccessStatusCodeType =
  (typeof HttpSuccessStatusCodeType)[keyof typeof HttpSuccessStatusCodeType];

// schemaの定義
const simpleResponseSchema = z.object({ message: z.string() });
type SimpleResponseSchema = z.infer<typeof simpleResponseSchema>;

// 実装
export const createSimpleResponse = (
  successCode: HttpSuccessStatusCodeType,
  message: string
): Response => {
  const err: SimpleResponseSchema = { message: message };
  return new Response(JSON.stringify(err), { status: successCode });
};
