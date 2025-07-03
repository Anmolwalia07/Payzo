import { prisma } from "@repo/database";
import { NextRequest, NextResponse } from "next/server"


export const POST=async(req:NextRequest,res:NextResponse)=>{
    const body=await req.json();
    const {id,token,userId}=body;
    
    const transaction=await prisma.paymentTransaction.findFirst({
        where:{
            id,
            userId
        }
    })
    if(!transaction){
        return NextResponse.json({message:"Not exists"},{status:401})
    }
    const {merchantId,merchantName,amount}=transaction


    const previousBalanceEntry = await prisma.balanceHistory.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    const previousBalance = previousBalanceEntry?.balance || 0;
    const newBalance = previousBalance - amount;
    if(newBalance !<0){
        return NextResponse.json({ message: "Not have balance" },{status:401});
    }

    const previousBalanceEntryMerchant = await prisma.balanceHistoryMerchant.findFirst({
      where: { merchantId },
      orderBy: { createdAt: "desc" }, 
    });

    let previousBalanceMerchant;

    if(previousBalanceEntryMerchant){
      previousBalanceMerchant = previousBalanceEntryMerchant?.balance || 0;
    }else{
        previousBalanceMerchant=0;
    }
    const newBalanceMerchant = previousBalanceMerchant +amount;
    try{
        await prisma.$transaction([
            prisma.user.update({
                where:{
                    id:userId,
                },
                data:{
                    balance:{
                        update:{
                            amount:{
                                decrement:amount,
                            }
                        }
                    }
                }
            }),
            prisma.paymentTransaction.update({
                where:{
                    id,
                    userId,
                    merchantId
                },
                data:{
                    status:'completed'
                }
            }),
             prisma.offRampTransaction.update({
            where:{
                token,
                provider:merchantName
            },
            data:{
                status:"Success"
            }
           }),

           prisma.balanceHistory.create({
                data: {
                balance: newBalance,
                userId,
                },
            }),
            prisma.merchant.update({
                where:{
                    id:merchantId,
                },
                data:{
                    balance:{
                        update:{
                            amount:{
                                increment:amount
                            }
                        }
                    },
                    balancehistroy:{
                        create:{
                            balance:newBalanceMerchant
                        }
                    }
                }
            }),
        ])
         
        return NextResponse.json({message:"Updated"},{status:201})
    }catch(err){
        await prisma.offRampTransaction.updateMany({
            where:{
                userId:userId,
                token:token,
                provider:merchantName,
            },
            data:{
                status:"Failure"
            }
        })
        await prisma.paymentTransaction.updateMany({
                where:{
                    id,
                    userId,
                    merchantId
                },
                data:{
                    status:'failed'
                }
            })
        return NextResponse.json({message:err},{status:401})
    }
}
