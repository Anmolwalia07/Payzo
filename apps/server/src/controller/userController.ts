import { prisma } from "@repo/database";
import { Request,Response } from "express";

export const addtoWallet = async (req:Request, res:Response) => {
  const paymentDetails = {
    userId: Number(req.body.userId),
    token: req.body.token,
    amount: Number(req.body.amount),
  };

  try {
    const previousBalanceEntry = await prisma.balanceHistory.findFirst({
      where: { userId: paymentDetails.userId },
      orderBy: { createdAt: "desc" }, // get the latest
    });

    const previousBalance = previousBalanceEntry?.balance || 0;
    const newBalance = previousBalance + paymentDetails.amount;
    await prisma.$transaction([
      prisma.balance.update({
        where: { userId: paymentDetails.userId },
        data: {
          amount: {
            increment: paymentDetails.amount,
          },
        },
      }),

      prisma.balanceHistory.create({
        data: {
          balance: newBalance,
          userId: paymentDetails.userId,
        },
      }),

      prisma.onRampTransaction.updateMany({
        where: {
          userId: paymentDetails.userId,
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

export const withdrawFromWallet=async (req:Request, res:Response) => {
  const paymentDetails = {
    userId: Number(req.body.userId),
    token: req.body.token,
    amount: Number(req.body.amount),
  };


  try {
    const previousBalanceEntry = await prisma.balanceHistory.findFirst({
      where: { userId: paymentDetails.userId },
      orderBy: { createdAt: "desc" }, // get the latest
    });

    const previousBalance = previousBalanceEntry?.balance || 0;
    const newBalance = previousBalance - paymentDetails.amount;
    if(newBalance !<0){
        res.status(401).json({ message: "Not have balance" });
        return;
    }
    await prisma.$transaction([
      prisma.balance.update({
        where: { userId: paymentDetails.userId },
        data: {
          amount: {
            decrement: paymentDetails.amount,
          },
        },
      }),

      prisma.balanceHistory.create({
        data: {
          balance: newBalance,
          userId: paymentDetails.userId,
        },
      }),

      prisma.offRampTransaction.updateMany({
        where: {
          userId: paymentDetails.userId,
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

export const addByRazorpay= async (req:Request, res:Response) => {
  const paymentDetails = {
    userId: Number(req.body.userId),
    token: req.body.token,
    amount: Number(req.body.amount),
  };

  try {
    const previousBalanceEntry = await prisma.balanceHistory.findFirst({
      where: { userId: paymentDetails.userId },
      orderBy: { createdAt: "desc" },
    });

    const previousBalance = previousBalanceEntry?.balance || 0;
    const newBalance = previousBalance + paymentDetails.amount;
    await prisma.$transaction([
      prisma.balance.update({
        where: { userId: paymentDetails.userId },
        data: {
          amount: {
            increment: paymentDetails.amount,
          },
        },
      }),

      prisma.balanceHistory.create({
        data: {
          balance: newBalance,
          userId: paymentDetails.userId,
        },
      }),

      prisma.onRampTransaction.updateMany({
        where: {
          userId: paymentDetails.userId,
          token: paymentDetails.token,
        },
        data: {
          status: "Success",
        },
      })
    ]);
    res.status(201).json({ message: "Captured" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
}



export const onRamping=async(req:Request,res:Response)=>{
  const paymentDetails = {
    userId: Number(req.body.userId),
    token: req.body.token,
  };
  try{
    await prisma.onRampTransaction.update({
        where: {
          userId: paymentDetails.userId,
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


  
export const offRamping=async(req:Request,res:Response)=>{
  const paymentDetails = {
    userId: Number(req.body.userId),
    token: req.body.token,
  };
  try{
    await prisma.offRampTransaction.update({
        where: {
          userId: paymentDetails.userId,
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
