-- CreateEnum
CREATE TYPE "User_application_status" AS ENUM ('INCOMPLETE', 'SUBMITTED', 'ACCEPTED', 'WAITING_LIST');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "application_status" "User_application_status" NOT NULL DEFAULT 'INCOMPLETE',
ADD COLUMN     "country" TEXT,
ADD COLUMN     "graduation" INTEGER,
ADD COLUMN     "level_of_study" TEXT,
ADD COLUMN     "mlh_code" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mlh_marketing" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mlh_terms" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "university" TEXT;

-- CreateTable
CREATE TABLE "UserCV" (
    "user_id" UUID NOT NULL,
    "filename" TEXT NOT NULL,
    "content_type" TEXT NOT NULL,
    "content" BYTEA NOT NULL,

    CONSTRAINT "UserCV_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "UserCV" ADD CONSTRAINT "UserCV_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("keycloak_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
