import {prisma} from '@repo/database';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../lib/auth';

export const POST= async (req:NextRequest, res: NextResponse) =>{
    const body = await req.json();
    const {userId}=body;

  try {
     const session = await getServerSession(authOptions);
    
        if (!session?.user) {
          return NextResponse.redirect(new URL('/login?callbackUrl=/dashboard', req.url));
        }
    const transactions = await prisma.paymentTransaction.findMany({
        where:{
            userId:Number(userId)
        },
      select: {
        id: true,
        merchantId: true,
        merchantName: true,
        amount: true,
        date: true,
        status: true,
        type: true,
      }
    });

    const formattedTransactions = transactions.map(t => ({
      ...t,
      id: t.id.toString(),
      merchantId: t.merchantId.toString(),
      date: t.date.toISOString().split('T')[0]
    }));

    return NextResponse.json(formattedTransactions,{status:201});
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Internal server error' },{status:401});
  }
}