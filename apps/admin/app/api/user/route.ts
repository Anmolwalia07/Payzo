import { prisma } from "@repo/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req:NextRequest) => {
  try {
     const users:any[]=await prisma.user.findMany({
    select:{
      id:true,
      email:true,
      name:true,
      balance:true,
      createdAt:true,
    }
  });
    if (users) {
      return NextResponse.json({ users }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Users not found" }, { status: 404 });
    }
  } catch (e) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
