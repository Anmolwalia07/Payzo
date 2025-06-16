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
    },
  });

  console.log({ admin });
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
