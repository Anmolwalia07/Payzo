import { prisma } from "@repo/database";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt"


const SignupInput = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const result = SignupInput.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: "Invalid input", errors: result.error.errors }, { status: 400 });
    }

    const { name, email, password } = result.data;

    const existUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    const hashPass=await bcrypt.hash(password,10);

    const user = await prisma.user.create({
      data: { name, email, password:hashPass },
    });

    const balance=await prisma.balance.create({
      data:{
        userId:user.id,
        amount:0,
        locked:1,
      }
    })

    return NextResponse.json({ message: "Success"}, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
