-- CreateTable
CREATE TABLE "balanceHistoryMerchant" (
    "id" SERIAL NOT NULL,
    "merchantId" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "balanceHistoryMerchant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offRampTransactionMerchant" (
    "id" SERIAL NOT NULL,
    "status" "OnRampStatus" NOT NULL,
    "token" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "offRamp" BOOLEAN NOT NULL DEFAULT true,
    "merchantId" INTEGER NOT NULL,

    CONSTRAINT "offRampTransactionMerchant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "offRampTransactionMerchant_token_key" ON "offRampTransactionMerchant"("token");

-- AddForeignKey
ALTER TABLE "balanceHistoryMerchant" ADD CONSTRAINT "balanceHistoryMerchant_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offRampTransactionMerchant" ADD CONSTRAINT "offRampTransactionMerchant_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
