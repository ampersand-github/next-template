import { z } from "zod";

const HttpErrorStatusCodeType = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  // todo 必要に応じて適宜追加してください。
} as const;

const errorResponseSchema = z.object({ message: z.string() });
type ErrorResponseSchema = z.infer<typeof errorResponseSchema>;

export type HttpErrorStatusCodeType =
  (typeof HttpErrorStatusCodeType)[keyof typeof HttpErrorStatusCodeType];

export const createErrResponse = (
  errorCode: HttpErrorStatusCodeType,
  message: string
): Response => {
  const err: ErrorResponseSchema = { message: message };
  return new Response(JSON.stringify(err), { status: errorCode });
};
