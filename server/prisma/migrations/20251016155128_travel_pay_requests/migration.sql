-- CreateEnum
CREATE TYPE "TravelMode" AS ENUM ('train', 'bus', 'private_road_vehicle', 'international_transport', 'other');

-- AlterTable
ALTER TABLE "UserInfo" ADD COLUMN     "travel_origin" VARCHAR(50);

-- CreateTable
CREATE TABLE "TravelReceipt" (
    "receipt_id" SERIAL NOT NULL,
    "uploader_user_id" UUID NOT NULL,
    "filename" TEXT NOT NULL,
    "content_type" TEXT NOT NULL,
    "content" BYTEA NOT NULL,
    "travel_mode" "TravelMode" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TravelReceipt_pkey" PRIMARY KEY ("receipt_id")
);

-- CreateTable
CREATE TABLE "TravelPayRequest" (
    "user_id" UUID NOT NULL,

    CONSTRAINT "TravelPayRequest_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE INDEX "TravelReceipt_uploader_user_id_idx" ON "TravelReceipt"("uploader_user_id");

-- AddForeignKey
ALTER TABLE "TravelReceipt" ADD CONSTRAINT "TravelReceipt_uploader_fkey" FOREIGN KEY ("uploader_user_id") REFERENCES "User"("keycloak_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TravelReceipt" ADD CONSTRAINT "TravelReceipt_travel_pay_request_fkey" FOREIGN KEY ("uploader_user_id") REFERENCES "TravelPayRequest"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TravelPayRequest" ADD CONSTRAINT "TravelPayRequest_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("keycloak_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
