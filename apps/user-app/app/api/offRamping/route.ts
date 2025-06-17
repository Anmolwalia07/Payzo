import {prisma} from "@repo/database"
import { NextRequest, NextResponse } from "next/server";
import Z from "zod"


const paymentDetails=Z.object({
    amount:Z.number(),
    provider:Z.string(),
    userId:Z.number(),
})


export const POST=async(req:NextRequest)=>{
    const body=await req.json();
    const result= paymentDetails.safeParse(body);
    if (!result.success) {
          return NextResponse.json({ message: "Invalid input", errors: result.error.errors }, { status: 400 });
    }
    const {amount,provider,userId}=result.data;
    const token=`token_${Math.floor(Math.random()*1000000000)}`
    
    try{
        const response= await prisma.offRampTransaction.create({
        data:{
            amount,
            provider,
            userId,
            status:"Processing",
            startTime:new Date(),
            token
        }
    })
    return NextResponse.json( {message:"Success",token}, { status: 200 })
    }catch(error){
        return NextResponse.json({ error:"Internal Server" }, { status: 400 });
    }

}

