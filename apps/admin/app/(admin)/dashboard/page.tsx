import { prisma } from "@repo/database"
import AdminDashboard from "@repo/ui/AdminDashboard"
export default async function page() {
  const users=await prisma.user.count()
  const transactions=await prisma.onRampTransaction.count() + await prisma.offRampTransaction.count() + await prisma.offRampTransactionMerchant.count()+await prisma.paymentTransaction.count();
  const recentTransactions:any[]=await prisma.paymentTransaction.findMany({
    select:{
      amount:true,
      id:true,
      status:true,
      type:true,
      user:{
        select:{
          name:true
        }
      },
      date:true
    }
  });
  return (
   <AdminDashboard users={users} transactions={transactions} recentTransactions={recentTransactions.slice(0,5)}/>
  )
}
AdminDashboard