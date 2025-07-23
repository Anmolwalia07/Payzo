import {prisma} from "@repo/database"
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from "../lib/auth";

export const GET = async(req:NextRequest)=> {
   const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.redirect(new URL('/login?callbackUrl=/dashboard', req.url));
    }

  try {
    const merchants = await prisma.merchant.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        rating: true,
        reviewCount: true,
      }
    });
    const merchantsWithLogo = merchants.map(merchant => ({
      ...merchant,
      id: merchant.id.toString(),
      logo: merchant.name.split(' ').map(w => w[0]).join('').substring(0, 2)
    }));
    return NextResponse.json(merchantsWithLogo,{status:201});
  } catch (error) {
    return  NextResponse.json({ error: 'Internal server error' },{status:401});
  }
}