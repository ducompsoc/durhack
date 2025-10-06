-- CreateEnum
CREATE TYPE "MethodOfTravel" AS ENUM ('train', 'bus', 'private_road_vehicle', 'international_transport', 'other');

-- AlterTable
ALTER TABLE "UserInfo" ADD COLUMN     "method_of_travel" "MethodOfTravel"[];

-- CreateTable
CREATE TABLE "TravelReceipts" (
    "idReceipt" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "filename" TEXT NOT NULL,
    "content_type" TEXT NOT NULL,
    "content" BYTEA NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TravelReceipts_pkey" PRIMARY KEY ("idReceipt")
);

-- AddForeignKey
ALTER TABLE "TravelReceipts" ADD CONSTRAINT "TravelReceipts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("keycloak_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
