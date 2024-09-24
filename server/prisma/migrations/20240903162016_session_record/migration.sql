-- CreateTable
CREATE TABLE "SessionRecord" (
    "session_record_id" TEXT NOT NULL,
    "user_id" UUID,
    "data" JSONB NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SessionRecord_pkey" PRIMARY KEY ("session_record_id")
);

-- CreateIndex
CREATE INDEX "SessionRecord_user_id_idx" ON "SessionRecord"("user_id");

-- AddForeignKey
ALTER TABLE "SessionRecord" ADD CONSTRAINT "SessionRecord_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("keycloak_user_id") ON DELETE SET NULL ON UPDATE CASCADE;
