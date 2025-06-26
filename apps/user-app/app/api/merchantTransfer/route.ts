import { prisma } from "@repo/database";
import { NextRequest, NextResponse } from "next/server"

export const POST=async(req:NextRequest,res:NextResponse)=>{

    const body=await req.json();
    const {amount,merchantId,userId,merchantName}=body;
    if(!amount || !merchantId || !userId || !merchantName){
      return NextResponse.json({message:"Invaild Input"},{status:401})
    }
    try{
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
        return NextResponse.json({message:"Created Successfully",id:transaction.id},{status:201})
    }catch(err){
        return NextResponse.json({message:"Internal Server error"},{status:401})
    }
}
