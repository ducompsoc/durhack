-- CreateTable
CREATE TABLE "Interest" (
    "id" SERIAL NOT NULL,
    "firstNames" VARCHAR(256) NOT NULL,
    "lastNames" VARCHAR(256) NOT NULL,
    "email" VARCHAR(256) NOT NULL,

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Interest_email_key" ON "Interest"("email");
