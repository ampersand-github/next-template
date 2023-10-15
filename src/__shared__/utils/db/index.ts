import { PrismaClient } from "@prisma/client";

/**
 * @public
 */
export type TransactionClient = Omit<
  PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use"
>;
/**
 * @public
 */
export const db = new PrismaClient();
