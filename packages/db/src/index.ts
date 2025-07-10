import { PrismaClient } from "../prisma/generated/client";

export const db = new PrismaClient();
export type { Prisma } from "../prisma/generated/client";
