import { PrismaClient } from "../generated/prisma/edge";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      name: "admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      balance: {
        create: {
          amount: 2000,
          locked: 1,
        },
      },
      balanceHistory:{
        create:{
          balance:2000,
          createdAt:new Date()
        }
      },
      OnRampTransaction: {
        create: {
          status: "Success",
          token: "token123",
          provider: "hdfc-bank",
          amount: 2000,
          startTime: new Date(),
        },
      },
      offRampTransaction: {
        create: {
          status: "Success",
          token: "token123",
          provider: "hdfc-bank",
          amount: 0,
          startTime: new Date(),
        },
      },
    },
  });

const merchants = [
    {  name: 'TechGadgets', email: 'techgadgets@example.com', password: 'password', category: 'electronics', rating: 4.7, reviewCount: 245 },
    {  name: 'FashionHub', email: 'fashionhub@example.com', password: 'password', category: 'clothing', rating: 4.3, reviewCount: 189 },
    {  name: 'BookNook', email: 'booknook@example.com', password: 'password', category: 'books', rating: 4.8, reviewCount: 312 },
    {  name: 'Cafe Brew', email: 'cafebrew@example.com', password: 'password', category: 'food', rating: 4.5, reviewCount: 167 },
    {  name: 'HomeEssentials', email: 'homeessentials@example.com', password: 'password', category: 'home', rating: 4.2, reviewCount: 98 },
    {  name: 'GadgetZone', email: 'gadgetzone@example.com', password: 'password', category: 'electronics', rating: 4.6, reviewCount: 203 },
  ];

  // Create merchants with balances
  for (const merchant of merchants) {
    const hashedPassword = await bcrypt.hash(merchant.password, 10);
    
    await prisma.merchant.upsert({
      where: {email: merchant.email },
      update: {},
      create: {
        name: merchant.name,
        email: merchant.email,
        password: hashedPassword,
        category: merchant.category,
        rating: merchant.rating,
        reviewCount: merchant.reviewCount,
        balance: {
          create: {
            amount: 500000,  
            locked: 0     
          }
        },
        balancehistroy: {
          create: {
            balance:500000,  
          }
        }
      },
    });
  }

  // Transaction data
  const transactions = [
    { merchantId: 1, merchantName: 'TechGadgets', amount: 12599, date: new Date('2023-06-15'), status: "completed", type: 'payment' },
    { merchantId: 3, merchantName: 'BookNook', amount: 2499, date: new Date('2023-06-18'), status: "completed", type: 'payment' },
    { merchantId: 4, merchantName: 'Cafe Brew', amount: 450, date: new Date('2023-06-20'), status: "completed", type: 'payment' },
    { merchantId: 2, merchantName: 'FashionHub', amount: 7999, date: new Date('2023-06-22'), status: "pending", type: 'payment' },
    { merchantId: 1, merchantName: 'TechGadgets', amount: 3500, date: new Date('2023-06-10'), status: "completed", type: 'refund' },
  ];

  // Create transactions
  for (const transaction of transactions) {
    await prisma.paymentTransaction.create({
      data: {
        merchant: { connect: { id: transaction.merchantId } },
        merchantName: transaction.merchantName,
        amount: transaction.amount,
        date: transaction.date,
        type: "payment",
        status:"completed",
        user: { connect: { id: admin.id } }
      }
    });
  }

  const adminPass=await bcrypt.hash("123456",10);

  const adminPannel=await prisma.admin.create({
    data:{
      email:"admin123@gmail.com",
      password:adminPass
    }
  })

    console.log('Seed data created successfully!');
}

main()
  .then(() => {
    prisma.$disconnect();
    console.log("Disconnect");
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
