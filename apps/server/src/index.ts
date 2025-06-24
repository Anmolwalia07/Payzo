import express from "express";
import dot from "dotenv";
dot.config();
import {prisma } from "@repo/database"
import razorpayRoutes from "./config/razorpay"
import bankAccountRoutes from "./routes/bankAcount"
import database from "./database/db"
database();
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors({ credentials:true}))
app.use(express.urlencoded({extended:true}))
app.use("/api/bankaccount",bankAccountRoutes)

app.use('/api/razorpay',razorpayRoutes);


app.post("/api/bank-webhook", async (req, res) => {
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
      // Update main balance
      prisma.balance.update({
        where: { userId: paymentDetails.userId },
        data: {
          amount: {
            increment: paymentDetails.amount,
          },
        },
      }),

      // Insert into balance history
      prisma.balanceHistory.create({
        data: {
          balance: newBalance,
          userId: paymentDetails.userId,
        },
      }),

      // Update transaction status
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
});

app.post("/api/withdraw/bank-webhook", async (req, res) => {
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
    console.log(newBalance)
    if(newBalance !<0){
        res.status(401).json({ message: "Not have balance" });
        return;
    }
    await prisma.$transaction([
      // Update main balance
      prisma.balance.update({
        where: { userId: paymentDetails.userId },
        data: {
          amount: {
            decrement: paymentDetails.amount,
          },
        },
      }),

      // Insert into balance history
      prisma.balanceHistory.create({
        data: {
          balance: newBalance,
          userId: paymentDetails.userId,
        },
      }),

      // Update transaction status
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
});


app.post("/api/razorpay-webhook", async (req, res) => {
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
});



app.put('/api/onRamping',async(req,res)=>{
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
  })


  app.put('/api/offRamping',async(req,res)=>{
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
  })


app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});