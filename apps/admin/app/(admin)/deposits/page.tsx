import { prisma } from "@repo/database";
import AllTransactions from "@repo/ui/AllTransactions";

export default async function page() {
  const onRampTransactions = await prisma.onRampTransaction.findMany({
      include: {
        user: { select: { id: true, name: true } }
      },
      orderBy: { startTime: 'desc' }
    }) 

    const transactions=[...onRampTransactions.map(tx => ({
        id: `ONTRAX-${tx.id}`,
        type: 'on_ramp',
        user: tx.user,
        merchant: null,
        amount: tx.amount,
        status: tx.status,
        date: tx.startTime.toISOString(),
        provider: tx.provider
      }))]
  return (
    <AllTransactions mockTransactions={transactions} text="Deposits"/>
  )
}
