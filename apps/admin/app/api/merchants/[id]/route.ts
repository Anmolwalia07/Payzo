import { prisma } from "@repo/database";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _req: NextRequest,
  {params}:{params:any}
) {
  const id  =params.id;
  const merchantId = Number(id);

  try {
    await prisma.$transaction([
      prisma.balanceMerchant.deleteMany({ where: { merchantId } }),
      prisma.balanceHistoryMerchant.deleteMany({ where: { merchantId } }),
      prisma.offRampTransactionMerchant.deleteMany({ where: { merchantId } }),
      prisma.merchant.delete({ where: { id: merchantId } }),
    ]);

    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ message: "Error deleting user" }, { status: 500 });
  }
}
