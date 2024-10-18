-- AlterEnum
ALTER TYPE "CvUploadChoice" RENAME VALUE 'noUpload' TO 'no_upload';

-- AlterTable
ALTER TABLE "Interest" RENAME COLUMN "firstNames" TO "first_names";
ALTER TABLE "Interest" RENAME COLUMN "lastNames" TO "last_names";

-- AlterTable
ALTER TABLE "UserConsent" RENAME COLUMN "consentName" TO "consent_name";

-- AlterTable
ALTER TABLE "UserFlag" RENAME COLUMN "flagName" TO "flag_name";

-- RenameIndex
ALTER INDEX "UserFlag_flagName_idx" RENAME TO "UserFlag_flag_name_idx";
