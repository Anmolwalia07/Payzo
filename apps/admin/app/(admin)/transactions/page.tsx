import { prisma } from "@repo/database"
import AllTransactions from "@repo/ui/AllTransactions"
export type UnifiedTransaction = {
  id: string
  type: 'payment' | 'on_ramp' | 'off_ramp_user' | 'off_ramp_merchant'
  user: { id: number; name: string } | null
  merchant: { id: number; name: string } | null
  amount: number
  status: string
  date: string
  provider: string | null
}

export default async function Page() {
  // Fetch all transaction types with relations
  const paymentTransactions = await prisma.paymentTransaction.findMany({
    include: {
      user: { select: { id: true, name: true } },
      merchant: { select: { id: true, name: true } }
    },
    orderBy: { date: 'desc' }
  }) 
  
  const offRampTransactions = await prisma.offRampTransaction.findMany({
    include: {
      user: { select: { id: true, name: true } }
    },
    orderBy: { startTime: 'desc' }
  })
  
  const onRampTransactions = await prisma.onRampTransaction.findMany({
    include: {
      user: { select: { id: true, name: true } }
    },
    orderBy: { startTime: 'desc' }
  }) 
  
  const offRampMerchantTransactions = await prisma.offRampTransactionMerchant.findMany({
    include: {
      Merchant: { select: { id: true, name: true } }
    },
    orderBy: { startTime: 'desc' }
  })

  // Map to unified format with proper typing
  const mapToUnified = (): UnifiedTransaction[] |any[]=> {
    return [
      ...paymentTransactions.map(tx => ({
        id: `P-${tx.id}`,
        type: 'payment',
        user: tx.user,
        merchant: tx.merchant,
        amount: tx.amount,
        status: tx.status,
        date: tx.date.toISOString(),
        provider: null
      })),
      
      ...onRampTransactions.map(tx => ({
        id: `ON-${tx.id}`,
        type: 'on_ramp',
        user: tx.user,
        merchant: null,
        amount: tx.amount,
        status: tx.status,
        date: tx.startTime.toISOString(),
        provider: tx.provider
      })),
      
      ...offRampTransactions.map(tx => ({
        id: `OFF-${tx.id}`,
        type: 'off_ramp_user',
        user: tx.user,
        merchant: null,
        amount: tx.amount,
        status: tx.status,
        date: tx.startTime.toISOString(),
        provider: tx.provider
      })),
      
      ...offRampMerchantTransactions.map(tx => ({
        id: `OFF-M-${tx.id}`,
        type: 'off_ramp_merchant',
        user: null,
        merchant: tx.Merchant,
        amount: tx.amount,
        status: tx.status,
        date: tx.startTime.toISOString(),
        provider: tx.provider
      }))
    ]
  }

  // Get transactions and sort by date (newest first)
  const transactions = mapToUnified().sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return <AllTransactions mockTransactions={transactions} text={"All Transactions"}/>
}