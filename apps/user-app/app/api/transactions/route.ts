import {prisma} from '@repo/database';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../lib/auth';

export const GET= async (req:NextRequest, res: NextResponse) =>{
  try {
     const session = await getServerSession(authOptions);
        if (!session?.user) {
          return NextResponse.redirect(new URL('/login?callbackUrl=/dashboard', req.url));
        }
    const transactions = await prisma.paymentTransaction.findMany({
        where:{
          userId:Number(session.user.id)
        }
    });

    return NextResponse.json(transactions,{status:201});
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Internal server error' },{status:401});
  }
}