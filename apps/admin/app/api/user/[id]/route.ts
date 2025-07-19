import { prisma } from "@repo/database";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _req: NextRequest,
  {params}:{params:any}
) {
  const id  =params.id;
  const userId = Number(id);

  try {
    await prisma.$transaction([
      prisma.balance.deleteMany({ where: { userId } }),
      prisma.balanceHistory.deleteMany({ where: { userId } }),
      prisma.onRampTransaction.deleteMany({ where: { userId } }),
      prisma.offRampTransaction.deleteMany({ where: { userId } }),
      prisma.paymentTransaction.deleteMany({ where: { userId } }),
      prisma.device.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } }),
    ]);

    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ message: "Error deleting user" }, { status: 500 });
  }
}
