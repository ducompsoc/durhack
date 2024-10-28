-- AlterTable
ALTER TABLE "UserInfo"
    ADD COLUMN "application_accepted_at" TIMESTAMP(3),
    ADD COLUMN "application_status_updated_at" TIMESTAMP(3),
    ADD COLUMN "application_submitted_at" TIMESTAMP(3);

-- Initialise application_submitted_at and application_status_updated_at
UPDATE "UserInfo"
    SET application_submitted_at = updated_at,
        application_status_updated_at = updated_at
    WHERE application_status = 'submitted';
