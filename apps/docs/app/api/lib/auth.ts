import { prisma } from "@repo/database";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

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
        const merchants=await prisma.merchant.findMany({});
        const id=merchants.length+1;
        if (!merchant) {
        await prisma.merchant.upsert({
          where: { email },
          update: {
            name: user.name || profile?.name || "Merchant",
          },
          create: {
            id,
            email,
            name: user.name || profile?.name || "Merchant",
            rating: 5.0,
            reviewCount: 0,
            category: "Technology",
            balance: {
             create: {
            amount: 500000,
            locked: 0     
          }  
        }
          }
        });

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