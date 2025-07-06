import {prisma} from "@repo/database";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "email", placeholder: "anmol@gmail.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials: any,req) {
            const existingUser = await prisma.admin.findFirst({
                where: {
                    email:credentials.email
                },
            });
            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                        return {
                        id: existingUser.id.toString(),
                        email: existingUser.email,
                        name:existingUser.name,
                    }
                }
                return null;
            }
            return null
          },
        })
    ],

    secret: "secret",
    pages: { signIn: "/login" },
    callbacks: {
        async session({ token, session }: any) {
            session.user.id = token.sub
            return session
        }
    }
  }