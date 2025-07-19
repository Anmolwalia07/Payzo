import { getServerSession } from 'next-auth';
import { authOptions } from "../lib/auth";
import { prisma } from "@repo/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.redirect(new URL('/login?callbackUrl=/dashboard', req.url));
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(session.user.id),
      },
      select: {
        id: true,
        name: true,
        email: true,
        balance: true,
        offRampTransaction:{
        select:{
          amount:true,
          id:true,
          provider:true,
          status:true,
          startTime:true,
          offRamp:true
        },
      orderBy: {
        startTime: 'desc',
      },
    },
    OnRampTransaction:{
        select:{
          amount:true,
          id:true,
          provider:true,
          status:true,
          startTime:true,
          onRamp:true,
        },
      orderBy: {
        startTime: 'desc',
      },  
    },    
        balanceHistory: true,
      },
    });

    if (user) {
      return NextResponse.json({ user }, { status: 200 });
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (e) {
    console.error("GET /api/user error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
