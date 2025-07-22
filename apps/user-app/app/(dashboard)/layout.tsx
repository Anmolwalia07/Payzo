
import SideBar from "@repo/ui/SideBar";
import DashHeader from '@repo/ui/DashHeader';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from "../api/lib/auth";
import { prisma } from "@repo/database";
import { UserProvider } from "./UserProvider";
import { loger } from "../api/loger/log";

export default async function DashboardLayout({ children }:{children:React.ReactNode}) {
       const session = await getServerSession(authOptions);
   if (!session?.user) {
    redirect('/login?callbackUrl=/dashboard');
   }
   const user:any=await prisma.user.findUnique({
    where:{
      id:Number(session.user.id)
    },
    select:{
      id:true,
      name:true,
      email:true,
      balance:true,
      OnRampTransaction:{
        select:{
          amount:true,
          id:true,
          provider:true,
          status:true,
          startTime:true,
          onRamp:true,
        },
      orderBy: {
        startTime: 'desc',
      },      
    },
    offRampTransaction:{
        select:{
          amount:true,
          id:true,
          provider:true,
          status:true,
          startTime:true,
          offRamp:true
        },
      orderBy: {
        startTime: 'desc',
      },      
    },
      balanceHistory:true,
    }
   })
   
      return (
        <UserProvider user={user}>
          <div className="w-full h-screen">
         <header><DashHeader loger={loger}/></header>
         <div className="w-full sm:h-[90%] flex">
          <SideBar />
          <main className="w-full">{children}</main>
         </div>
        </div>
        </UserProvider>
      );
    }