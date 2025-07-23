import { prisma } from "@repo/database";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../lib/auth";
import { loger } from "../loger/log";

export const POST=async(req:NextRequest,res:NextResponse)=>{
    const session = await getServerSession(authOptions);
    
        if (!session?.user) {
          return NextResponse.redirect(new URL('/login?callbackUrl=/dashboard', req.url));
        }
    const body=await req.json();
    const {amount,merchantId,userId,merchantName}=body;
    if(!amount || !merchantId || !userId || !merchantName){
      return NextResponse.json({message:"Invaild Input"},{status:401})
    }
    try{
        await loger('info',"Attempted Merchant Transaction",{
          userId:session?.user.id,
          merchantId,
          amount,
          reqUrl:req.url
        })

       const transaction=  await prisma.paymentTransaction.create({
        data:{
            amount:amount,
            date:new Date(),
            status:"pending",
            merchantId:merchantId,
            type:"payment",
            userId:userId,
            merchantName:merchantName,
        }
    })

     await loger('info',"Merchant Transaction Created",{
          userId:session?.user.id,
          merchantId,
          amount,
          transactionId:transaction.id,
          reqUrl:req.url
        })
        
        return NextResponse.json({message:"Created Successfully",id:transaction.id},{status:201})
    }catch(err){
         await loger('error',"Transaction error",{
          userId:session?.user.id,
          merchantId,
          amount,
          reqUrl:req.url
        })
        return NextResponse.json({message:"Internal Server error"},{status:401})
    }
}
