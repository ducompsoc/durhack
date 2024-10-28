import { type Prisma, PrismaClient } from "@prisma/client"

export type User = Prisma.UserGetPayload<{ select: undefined }>
export type TokenSet = Prisma.TokenSetGetPayload<{ select: undefined }>
export type UserInfo = Prisma.UserInfoGetPayload<{ select: undefined }>
export type UserCV = Prisma.UserCVGetPayload<{ select: undefined }>

export const prisma = new PrismaClient()
