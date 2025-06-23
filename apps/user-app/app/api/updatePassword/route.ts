import { prisma } from "@repo/database";
import { authOptions } from "../lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import  z  from "zod";
import bcrypt from "bcrypt"




const PasswordCheck = z.object({
  id:z.number(),
  password: z.string().min(5),
  newPassword: z.string().min(6),
  conformPassword: z.string().min(6).optional(),
});

export const POST=async(req:NextRequest)=>{
    const session = await getServerSession(authOptions);
   if (!session?.user) {
    return  NextResponse.json({message:"UnAuthorized"},{status:401});

}
    const body=await req.json();
    const result=PasswordCheck.safeParse(body);
    if(result.error){
        return  NextResponse.json({message:"Invaild Input"},{status:401});
    }

    const {id,password,newPassword}=result.data;
   try{
     const user=await prisma.user.findFirst({
        where:{
            id,
        }
    })

    if(!user){
        return  NextResponse.json({message:"No user Exists"},{status:401});
    }

    const passMatch=await bcrypt.compare(password,user.password);

    if(!passMatch){
        return  NextResponse.json({message:"Invaild Password"},{status:401});
    }

    const newHashPassword=await bcrypt.hash(newPassword,10);

    await prisma.user.update({
        where:{
            id,
        },
        data:{
            password:newHashPassword
        }
    })

    return  NextResponse.json({message:"Updated Successfully"},{status:201});

   }catch(err){
      return  NextResponse.json({message:"Internal error"},{status:401});
   }

}