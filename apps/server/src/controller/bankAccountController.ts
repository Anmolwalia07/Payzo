import { BankAccountModel, TransactionModel } from "../database/db";
import { Request, Response } from "express";
import mongoose from "mongoose";
import Z from "zod";

const getAccountDetailSchema = Z.object({
  userId: Z.number()
});

export const getAccountDetail = async (req: Request, res: Response) => {
  const body={userId:Number(req.params.id)}
  const result = getAccountDetailSchema.safeParse(body);
  
  if (!result.success) {
    return res.status(400).json({ message: "Invalid Details", error: result.error });
  }

  const { userId } = result.data;

  try {
    const accountDetail = await BankAccountModel.findOne({ userId });
    if (!accountDetail) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({ accountDetail });
  } catch (err) {
    return res.status(500).json({ message: "Internal error" });
  }
};

const createAccountSchema = Z.object({
  userId: Z.number(),
  name: Z.string().min(3),
  status: Z.string().optional(),
});

export const createAccountDetail = async (req: Request, res: Response) => {
  const result = createAccountSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Invalid Details", error: result.error });
  }

  const { userId, name, status } = result.data;

  try {
    const existingAccount = await BankAccountModel.findOne({ userId });
    if (existingAccount) {
      return res.status(409).json({ message: "Account already exists" });
    }

    const accountNumber = `AC${Math.floor(Math.random() * 10 ** 10).toString().padStart(12, "0")}`;

    const account = await BankAccountModel.create({
      userId,
      name,
      status,
      accountNumber,
    });

    res.status(201).json({ message: "Account created", account });
  } catch (err) {
    return res.status(500).json({ message: "Internal error" });
  }
};



const updateAccountSchema = Z.object({
  userId: Z.number(),
  accountNumber: Z.string().min(12),
  name: Z.string().min(3).optional(),
  status: Z.string().optional(),
});

export const updateAccountDetail = async (req: Request, res: Response) => {

   const _id=req.params.id
  const result = updateAccountSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Invalid Details", error: result.error });
  }

  const { userId, accountNumber, name, status } = result.data;

  try {
    const updated = await BankAccountModel.findOneAndUpdate(
      { userId, accountNumber,_id },
      { $set: { ...(name && { name }), ...(status && { status }) } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({ message: "Account updated", updated });
  } catch (err) {
    return res.status(500).json({ message: "Internal error" });
  }
};



const blockAccountSchema = Z.object({
  userId: Z.number(),
  accountNumber: Z.string().min(12),
});

export const blockAccount = async (req: Request, res: Response) => {
  const result = blockAccountSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Invalid Details", error: result.error });
  }
   const _id=req.params.id
  const { userId, accountNumber } = result.data;

  try {
    const blocked = await BankAccountModel.findOneAndUpdate(
      { userId, accountNumber },
      { $set: { status: "blocked" } },
      { new: true }
    );

    if (!blocked) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({ message: "Account blocked", blocked });
  } catch (err) {
    return res.status(500).json({ message: "Internal error" });
  }
};




const deleteAccountSchema = Z.object({
  userId: Z.number(),
  accountNumber: Z.string().min(12),
});

export const deleteAccount = async (req: Request, res: Response) => {
       const _id=req.params.id
  const result = deleteAccountSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Invalid Details", error: result.error });
  }

  const { userId, accountNumber } = result.data;

  try {
    const deleted = await BankAccountModel.findOneAndDelete({ userId, accountNumber ,_id});

    if (!deleted) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({ message: "Account deleted", deleted });
  } catch (err) {
    return res.status(500).json({ message: "Internal error" });
  }
};

export const decreaseAccountBalance = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const { amount } = req.body;
  if (!amount || isNaN(amount)) {
    return res.status(400).json({ error: "Invalid or missing amount" });
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Fetch account inside the session
    const account = await BankAccountModel.findOne({userId}).session(session);
    if (!account) {
      throw new Error("Account not found");
    }

    // Check for sufficient balance
    if (account.accountBalance < amount) {
      throw new Error("Insufficient balance");
    }

    // Perform the deduction
    await BankAccountModel.updateOne(
      { userId },
      { $inc: { accountBalance: -amount } },
      { session }
    );

  
     await TransactionModel.create([{ userId: userId, amount, type: 'DEBIT' }], { session });

    await session.commitTransaction();
    res.status(200).json({ message: "Amount deducted successfully" });

  } catch (error: any) {
    await session.abortTransaction();
    res.status(500).json({ error: error.message || "Internal Server Error" });

  } finally {
    session.endSession();
  }
};

export const increaseAccountBalance = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const { amount } = req.body;
  if (!amount || isNaN(amount)) {
    return res.status(400).json({ error: "Invalid or missing amount" });
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Fetch account inside the session
    const account = await BankAccountModel.findOne({userId}).session(session);
    if (!account) {
      throw new Error("Account not found");
    }

    // Perform the deduction
    await BankAccountModel.updateOne(
      { userId },
      { $inc: { accountBalance: amount } },
      { session }
    );

  
     await TransactionModel.create([{ userId: userId, amount, type: 'CREDIT' }], { session });

    await session.commitTransaction();
    res.status(200).json({ message: "Amount added successfully" });

  } catch (error: any) {
    await session.abortTransaction();
    res.status(500).json({ error: error.message || "Internal Server Error" });

  } finally {
    session.endSession();
  }
};