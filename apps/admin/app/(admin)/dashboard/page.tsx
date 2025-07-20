import { prisma } from "@repo/database"
import AdminDashboard from "@repo/ui/AdminDashboard"

export default async function page() {
  const users=await prisma.user.count()
  const transactions=await prisma.onRampTransaction.count() + await prisma.offRampTransaction.count() + await prisma.offRampTransactionMerchant.count()+await prisma.paymentTransaction.count();
  const recentTransactions:any[]=await prisma.paymentTransaction.findMany({
    take:5,
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
    },
    orderBy:{
      id:'desc'
    }
  });

  const totalvolume=await prisma.balance.findMany({
    select:{
      amount:true
    }
  })
  const totalvolume1=await prisma.balanceMerchant.findMany({
    select:{
      amount:true
    }
  })
  const total:number[]=[...totalvolume.map(i=>i.amount),...totalvolume1.map(i=>i.amount)]
  let volume:number=0;
  total.forEach(i=>{
    volume+=i;
  })
  return (
   <AdminDashboard users={users} transactions={transactions} recentTransactions={recentTransactions.slice(0,5)} volume={volume}/>
  )
}
AdminDashboard