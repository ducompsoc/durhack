/*
  Warnings:

  - The primary key for the `UserInfo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `mlhCodeConduct` on the `UserInfo` table. All the data in the column will be lost.
  - You are about to drop the column `mlhMarketing` on the `UserInfo` table. All the data in the column will be lost.
  - You are about to drop the column `mlhPolicies` on the `UserInfo` table. All the data in the column will be lost.
  - You are about to drop the column `user_info_id` on the `UserInfo` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `UserInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserInfo" DROP CONSTRAINT "UserInfo_user_info_id_fkey";

-- AlterTable
ALTER TABLE "UserInfo" DROP CONSTRAINT "UserInfo_pkey",
DROP COLUMN "mlhCodeConduct",
DROP COLUMN "mlhMarketing",
DROP COLUMN "mlhPolicies",
DROP COLUMN "user_info_id",
ADD COLUMN     "user_id" UUID NOT NULL,
ADD CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("user_id");

-- CreateTable
CREATE TABLE "UserFlag" (
    "user_id" UUID NOT NULL,
    "flag_name" TEXT NOT NULL,

    CONSTRAINT "user_id_and_name" PRIMARY KEY ("user_id","flag_name")
);

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("keycloak_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFlag" ADD CONSTRAINT "UserFlag_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("keycloak_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
