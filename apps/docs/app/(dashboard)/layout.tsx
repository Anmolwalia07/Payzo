import SideBar from "@repo/ui/SideBarForMerchant";
import MerchantHeader from '@repo/ui/MerchantHeader';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from "../api/lib/auth";
import { prisma } from "@repo/database";
import { MerchantProvider } from "./MerchantProvider";

export default async function DashboardLayout({ children }:{children:React.ReactNode}) {
       const session = await getServerSession(authOptions);
   if (!session?.user) {
    redirect('/login?callbackUrl=/dashboard');
   }
   
   const merchant:any=await prisma.merchant.findFirst({
    where:{
      email:(session.user.email)
    },
    select:{
      id:true,
      name:true,
      email:true,
      balance:true,
      rating:true,
      category:true,
      reviewCount:true,
      createdAt:true,
      transactions:{
        select:{
            amount:true,
            id:true,
            status:true,
            date:true,
            userId:true,
            type:true,
        },
        orderBy:{
            date:'desc',
        }
      },
    offRampTransaction:{
        select:{
          amount:true,
          id:true,
          provider:true,
          status:true,
          startTime:true,
          offRamp:true,
          token:true
        },
      orderBy: {
        startTime: 'desc',
      },      
    },
      balancehistroy:true,
    }
   })

      return (
        <MerchantProvider merchant={merchant}>
          <div className="w-full h-screen">
         <header><MerchantHeader/></header>
         <div className="w-full sm:h-[90%] flex">
          <SideBar />
          <main className="w-full">{children}</main>
         </div>
        </div>
        </MerchantProvider>
      );
    }