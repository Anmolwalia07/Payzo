import { prisma } from "@repo/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req:NextRequest) => {
  try {
     const Merchants:any[]=await prisma.merchant.findMany({
    select:{
      id:true,
      email:true,
      name:true,
      balance:true,
      createdAt:true,
      status:true
    }
  });
    if (Merchants) {
      return NextResponse.json({ Merchants }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Merchants not found" }, { status: 404 });
    }
  } catch (e) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
