/*
  Warnings:

  - You are about to drop the column `method_of_travel` on the `UserInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserInfo" DROP COLUMN "method_of_travel";

-- CreateTable
CREATE TABLE "ReimbursementForm" (
    "user_id" UUID NOT NULL,
    "idRequest" SERIAL NOT NULL,
    "method_of_travel" "MethodOfTravel"[],
    "id_receipt" INTEGER NOT NULL,

    CONSTRAINT "ReimbursementForm_pkey" PRIMARY KEY ("idRequest")
);

-- AddForeignKey
ALTER TABLE "ReimbursementForm" ADD CONSTRAINT "ReimbursementForm_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("keycloak_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReimbursementForm" ADD CONSTRAINT "ReimbursementForm_id_receipt_fkey" FOREIGN KEY ("id_receipt") REFERENCES "TravelReceipts"("idReceipt") ON DELETE RESTRICT ON UPDATE CASCADE;
