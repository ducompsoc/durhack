-- CreateTable
CREATE TABLE "User" (
    "keycloak_user_id" UUID NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("keycloak_user_id")
);

-- CreateTable
CREATE TABLE "TokenSet" (
    "user_id" UUID NOT NULL,
    "token_type" TEXT,
    "access_token" TEXT,
    "id_token" TEXT,
    "refresh_token" TEXT,
    "scope" TEXT,
    "accessExpiry" TIMESTAMP(0),
    "sessionState" TEXT,

    CONSTRAINT "TokenSet_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "TokenSet" ADD CONSTRAINT "TokenSet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("keycloak_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
