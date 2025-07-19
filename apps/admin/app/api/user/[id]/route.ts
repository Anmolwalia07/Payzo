import { prisma } from "@repo/database";
import { NextResponse } from "next/server";

export const DELETE = async ({ params }: { params: { id: string } }
) => {
  const userId = Number(params.id);

  try {
    // Run all deletions in a transaction to maintain consistency
    await prisma.$transaction([
      prisma.balance.deleteMany({
        where: { userId },
      }),
      prisma.balanceHistory.deleteMany({
        where: { userId },
      }),
      prisma.onRampTransaction.deleteMany({
        where: { userId },
      }),
      prisma.offRampTransaction.deleteMany({
        where: { userId },
      }),
      prisma.paymentTransaction.deleteMany({
        where: { userId },
      }),
      prisma.device.deleteMany({
        where: { userId },
      }),
      prisma.user.delete({
        where: { id: userId },
      }),
    ]);

    return NextResponse.json({ message: "User and related data deleted" }, { status: 200 });
  } catch (error) {
    console.error("Deletion error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};
