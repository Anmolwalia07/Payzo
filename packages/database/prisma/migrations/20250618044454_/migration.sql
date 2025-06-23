-- AlterTable
ALTER TABLE "OnRampTransaction" ADD COLUMN     "onRamp" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "offRampTransaction" ADD COLUMN     "offRamp" BOOLEAN NOT NULL DEFAULT true;
