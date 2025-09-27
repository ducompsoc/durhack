-- CreateEnum
CREATE TYPE "MidnightSnack" AS ENUM ('pizza', 'alternative', 'nothing');

-- AlterTable
ALTER TABLE "UserInfo" ADD COLUMN     "midnight_snack" "MidnightSnack";
