-- CreateIndex
CREATE INDEX "UserConsent_user_id_idx" ON "UserConsent"("user_id");

-- CreateIndex
CREATE INDEX "UserConsent_consent_name_idx" ON "UserConsent"("consent_name");

-- CreateIndex
CREATE INDEX "UserFlag_user_id_idx" ON "UserFlag"("user_id");
