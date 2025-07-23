import {prisma} from "@repo/database"
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Z from "zod"
import { authOptions } from "../lib/auth";
import { loger } from "../loger/log";


const paymentDetails=Z.object({
    amount:Z.number(),
    provider:Z.string(),
    userId:Z.number(),
})


export const POST=async(req:NextRequest)=>{
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.redirect(new URL('/login?callbackUrl=/dashboard', req.url));
    }

    const body=await req.json();
    const result= paymentDetails.safeParse(body);
    if (!result.success) {
          return NextResponse.json({ message: "Invalid input", errors: result.error.errors }, { status: 400 });
    }
    const {amount,provider,userId}=result.data;
    const token=`token_${Math.floor(Math.random()*1000000000)}`
    
    try{
        await loger('info',"Withdraw from Wallet Attempted",{
          email:session?.user.email,
          token,
          reqUrl:req.url
        })

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

    await loger('info',"Withdraw from Wallet Passed",{
          email:session?.user.email,
          token,
          reqUrl:req.url
        })
    return NextResponse.json( {message:"Success",token}, { status: 200 })
    }catch(error){
         await loger('error',"Withdraw from Wallet",{
          email:session?.user.email,
          token,
          reqUrl:req.url

        })
        return NextResponse.json({ error:"Internal Server" }, { status: 400 });
    }

}

