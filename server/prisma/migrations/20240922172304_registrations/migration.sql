-- CreateEnum
CREATE TYPE "UserApplicationStatus" AS ENUM ('unsubmitted', 'submitted', 'accepted', 'waiting_list');

-- CreateEnum
CREATE TYPE "CvUploadChoice" AS ENUM ('indeterminate', 'upload', 'remind', 'noUpload');

-- AlterTable
ALTER TABLE "Interest" ADD COLUMN     "year" INTEGER NOT NULL DEFAULT 2024;

-- CreateTable
CREATE TABLE "User" (
    "keycloak_user_id" UUID NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("keycloak_user_id")
);

-- CreateTable
CREATE TABLE "UserCV" (
    "user_id" UUID NOT NULL,
    "filename" TEXT NOT NULL,
    "content_type" TEXT NOT NULL,
    "content" BYTEA NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCV_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "UserInfo" (
    "user_id" UUID NOT NULL,
    "application_status" "UserApplicationStatus" NOT NULL DEFAULT 'unsubmitted',
    "cv_upload_choice" "CvUploadChoice" NOT NULL DEFAULT 'indeterminate',
    "age" SMALLINT,
    "university" VARCHAR(50),
    "graduation_year" INTEGER,
    "level_of_study" VARCHAR(50),
    "country_of_residence" CHAR(3),
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "UserFlag" (
    "user_id" UUID NOT NULL,
    "flagName" TEXT NOT NULL,

    CONSTRAINT "user_flag:user_id_and_flag_name" PRIMARY KEY ("user_id","flagName")
);

-- CreateTable
CREATE TABLE "UserConsent" (
    "user_id" UUID NOT NULL,
    "consentName" TEXT NOT NULL,
    "choice" BOOLEAN NOT NULL,

    CONSTRAINT "user_consent:user_id_and_consent_name" PRIMARY KEY ("user_id","consentName")
);

-- CreateTable
CREATE TABLE "TokenSet" (
    "user_id" UUID NOT NULL,
    "token_type" TEXT,
    "access_token" TEXT,
    "id_token" TEXT,
    "refresh_token" TEXT,
    "scope" TEXT,
    "access_expiry" TIMESTAMP(0),
    "session_state" TEXT,

    CONSTRAINT "TokenSet_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "SessionRecord" (
    "session_record_id" TEXT NOT NULL,
    "user_id" UUID,
    "data" JSONB NOT NULL,
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SessionRecord_pkey" PRIMARY KEY ("session_record_id")
);

-- CreateIndex
CREATE INDEX "SessionRecord_user_id_idx" ON "SessionRecord"("user_id");

-- AddForeignKey
ALTER TABLE "UserCV" ADD CONSTRAINT "UserCV_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("keycloak_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("keycloak_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFlag" ADD CONSTRAINT "UserFlag_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("keycloak_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserConsent" ADD CONSTRAINT "UserConsent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("keycloak_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TokenSet" ADD CONSTRAINT "TokenSet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("keycloak_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionRecord" ADD CONSTRAINT "SessionRecord_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("keycloak_user_id") ON DELETE SET NULL ON UPDATE CASCADE;
