/*
  Warnings:

  - The values [private_road_vehicle,international_transport] on the enum `MethodOfTravel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MethodOfTravel_new" AS ENUM ('train', 'bus', 'private-road-vehicle', 'international-transport', 'other');
ALTER TABLE "ReimbursementForm" ALTER COLUMN "method_of_travel" TYPE "MethodOfTravel_new"[] USING ("method_of_travel"::text::"MethodOfTravel_new"[]);
ALTER TYPE "MethodOfTravel" RENAME TO "MethodOfTravel_old";
ALTER TYPE "MethodOfTravel_new" RENAME TO "MethodOfTravel";
DROP TYPE "MethodOfTravel_old";
COMMIT;
