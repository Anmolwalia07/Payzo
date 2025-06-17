import express from "express";
import dot from "dotenv";
dot.config();
import {prisma } from "@repo/database"
import razorpayRoutes from "./config/razorpay"
import bankAccountRoutes from "./routes/bankAcount"
import database from "./database/db"
database();
import cors from "cors"
import { updateAccountBalance } from "./controller/bankAccountController";

const app = express();
app.use(express.json());
app.use(cors({ credentials:true}))
app.use(express.urlencoded({extended:true}))
app.use("/api/bankaccount",bankAccountRoutes)

 

app.use('/api/razorpay',razorpayRoutes);


app.get('/',(req,res)=>{
  res.status(201).json({message:"Anmol"})
})


app.post('/api/payments',async (req,res)=>{
    const {userId,amount,razorpayPaymentId,status}=req.body();

})

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


// Initialize Razorpay instance


app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});