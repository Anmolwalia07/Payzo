import { prisma } from "@repo/database";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET!,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret",
  pages: { signIn: "/login" },
  callbacks: {
    async signIn({ user, account, profile }: any) {
      if (account?.provider === "google" || account?.provider === "facebook") {
        const email = user.email;
        const merchant = await prisma.merchant.findUnique({ where: { email } });
        if (!merchant) {
        const newMerchant= await prisma.merchant.create({
          data: {
            email,
            name: user.name || profile?.name || "Merchant",
            rating: 5.0,
            reviewCount: 0,
            category: " ",
            balancehistroy:{
              create:{
                balance:150000,
              }
            },
            balance: {
             create: {
            amount: 150000,
            locked: 0     
          }  
        }
          }
        });
        await axios.post(`${process.env.NEXT_PUBLIC_ServerUrl}/api/bankaccount/`,{userId:Number(1000000+newMerchant.id),name:user.name || profile?.name})
        }
       return true;
      }
      return false;
    },
    async jwt({ token, user, account, profile }: any) {
      if (profile && user) {
        const email = user.email;
        const merchant = await prisma.merchant.findUnique({ where: { email } });
        if (merchant) token.merchantId = merchant.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.merchantId;
        session.user.role = "merchant";
      }
      return session;
    }
  }
};