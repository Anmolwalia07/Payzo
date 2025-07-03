import { prisma } from "@repo/database";
import { Request,Response } from "express";

export const balanceUpadateInAccount =async (req:Request, res:Response) => {
  const paymentDetails = {
    merchantId: Number(req.body.merchantId),
    token: req.body.token,
    amount: Number(req.body.amount),
  };
  try {
    const previousBalanceEntry = await prisma.balanceHistoryMerchant.findFirst({
      where: { merchantId: paymentDetails.merchantId },
      orderBy: { createdAt: "desc" }, 
    });

    const previousBalance = previousBalanceEntry?.balance || 0;
    const newBalance = previousBalance - paymentDetails.amount;
    if(newBalance !<0){
        res.status(401).json({ message: "Not have balance" });
        return;
    }
    await prisma.$transaction([
      prisma.balanceMerchant.update({
        where: { merchantId: paymentDetails.merchantId },
        data: {
          amount: {
            decrement: paymentDetails.amount,
          },
        },
      }),

      prisma.balanceHistoryMerchant.create({
        data: {
          balance: newBalance,
          merchantId: paymentDetails.merchantId,
        },
      }),

      prisma.offRampTransactionMerchant.updateMany({
        where: {
          merchantId: paymentDetails.merchantId,
          token: paymentDetails.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.status(201).json({ message: "Captured" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
}


export const offRamping=async(req:Request,res:Response)=>{
  const paymentDetails = {
    merchantId: Number(req.body.merchantId),
    token: req.body.token,
  };
  try{
    await prisma.offRampTransactionMerchant.update({
        where: {
          merchantId: paymentDetails.merchantId,
          token: paymentDetails.token,
        },
        data: {
          status: "Failure",
        },
      })
    res.status(201).json({ message: "failed" });

  }catch(err){
      res.status(500).json({ err: "Internal Server Error" });
  }
  }