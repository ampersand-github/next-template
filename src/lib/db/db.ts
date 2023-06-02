import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @public
 */
export const db = prisma;
