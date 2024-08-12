-- CreateTable
CREATE TABLE "UserInfo" (
    "user_info_id" UUID NOT NULL,
    "age" SMALLINT NOT NULL,
    "university" VARCHAR(50) NOT NULL,
    "graduation_year" DATE NOT NULL,
    "level_of_study" VARCHAR(50) NOT NULL,
    "country" VARCHAR(256) NOT NULL,
    "mlhCodeConduct" BOOLEAN NOT NULL,
    "mlhPolicies" BOOLEAN NOT NULL,
    "mlhMarketing" BOOLEAN NOT NULL,

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("user_info_id")
);

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_user_info_id_fkey" FOREIGN KEY ("user_info_id") REFERENCES "User"("keycloak_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
