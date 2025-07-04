import { getServerSession } from 'next-auth';
import { authOptions } from "../lib/auth";
import { prisma } from "@repo/database";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.redirect(new URL('/login?callbackUrl=/dashboard', req.url));
    }

   const merchant:any=await prisma.merchant.findFirst({
    where:{
      email:(session.user.email)
    },
    select:{
      id:true,
      name:true,
      email:true,
      balance:true,
      rating:true,
      category:true,
      reviewCount:true,
      createdAt:true,
      transactions:{
        select:{
            amount:true,
            id:true,
            status:true,
            date:true,
            userId:true,
            type:true,
        },
        orderBy:{
            date:'desc',
        }
      },
    offRampTransaction:{
        select:{
          amount:true,
          id:true,
          provider:true,
          status:true,
          startTime:true,
          offRamp:true,
          token:true
        },
      orderBy: {
        startTime: 'desc',
      },      
    },
      balancehistroy:true,
    }
   })

    if (merchant) {
      return NextResponse.json({ merchant }, { status: 200 });
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (e) {
    console.error("GET /api/user error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
