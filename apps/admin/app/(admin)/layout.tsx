import SideBar from "@repo/ui/SideBarForAdmin";
import DashHeader from '@repo/ui/AdminDashHeader';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from "../api/lib/auth";

export default async function DashboardLayout({ children }:{children:React.ReactNode}) {
       const session = await getServerSession(authOptions);
   if (!session?.user) {
    redirect('/login?callbackUrl=/dashboard');
   }
   
      return (
          <div className="w-full h-screen">
         <header><DashHeader/></header>
         <div className="w-full sm:h-[90%] flex">
          <SideBar name={session.user.name} email={session.user.email}/>
          <main className="w-full">{children}</main>
         </div>
        </div>
      );
    }