import { prisma } from "@repo/database";
import Reconciliation from "@repo/ui/Reconciliation";

export interface ReconciliationItem {
  id: string;
  transactionId: string;
  amount: number;
  date: string;
  source: string;
  status: 'matched' | 'unmatched' | 'pending';
  variance: number;
  internalRef: string;
  externalRef: string;
}

export default async function ReconciliationPage() {
  // Fetch all transaction types in parallel
  const [
    paymentTransactions,
    onRampTransactions,
    offRampTransactions,
    offRampMerchantTransactions
  ] = await Promise.all([
    prisma.paymentTransaction.findMany({
      include: {
        merchant: { select: { name: true } },
        user: { select: { name: true } }
      }
    }),
    prisma.onRampTransaction.findMany(),
    prisma.offRampTransaction.findMany(),
    prisma.offRampTransactionMerchant.findMany({
      include: {
        Merchant: { select: { name: true } }
      }
    })
  ]);

  // Map transactions to a unified reconciliation format
  const mapToReconciliationItem = (): ReconciliationItem[] |any[] => {
    return [
      ...paymentTransactions.map(tx => ({
        id: `P-${tx.id}`,
        transactionId: `PAY-${tx.id}`,
        amount: tx.amount,
        date: tx.date.toISOString(),
        source: tx.merchant?.name || "Payment System",
        status: tx.status === "completed" ? "matched" : 
               tx.status === "pending" ? "pending" : "unmatched",
        variance: tx.status === "failed" ? tx.amount : 0,
        internalRef: `INT-PAY-${tx.id}`,
        externalRef: `EXT-PAY-${tx.userId}-${tx.id}`
      })),
      
      ...onRampTransactions.map(tx => ({
        id: `OR-${tx.id}`,
        transactionId: `DEP-${tx.id}`,
        amount: tx.amount,
        date: tx.startTime.toISOString(),
        source: tx.provider,
        status: tx.status === "Success" ? "matched" : 
               tx.status === "Processing" ? "pending" : "unmatched",
        variance: tx.status === "Failure" ? tx.amount : 0,
        internalRef: `INT-DEP-${tx.id}`,
        externalRef: tx.token
      })),
      
      ...offRampTransactions.map(tx => ({
        id: `OFF-${tx.id}`,
        transactionId: `WDL-${tx.id}`,
        amount: tx.amount,
        date: tx.startTime.toISOString(),
        source: tx.provider,
        status: tx.status === "Success" ? "matched" : 
               tx.status === "Processing" ? "pending" : "unmatched",
        variance: tx.status === "Failure" ? tx.amount : 0,
        internalRef: `INT-WDL-${tx.id}`,
        externalRef: tx.token
      })),
      
      ...offRampMerchantTransactions.map(tx => ({
        id: `OFF-M-${tx.id}`,
        transactionId: `MWDL-${tx.id}`,
        amount: tx.amount,
        date: tx.startTime.toISOString(),
        source: tx.Merchant?.name || "Merchant",
        status: tx.status === "Success" ? "matched" : 
               tx.status === "Processing" ? "pending" : "unmatched",
        variance: tx.status === "Failure" ? tx.amount : 0,
        internalRef: `INT-MWDL-${tx.id}`,
        externalRef: tx.token
      }))
    ];
  };

  // Sort by date (newest first)
  const reconciliationItems = mapToReconciliationItem().sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Calculate summary statistics
  const summary = {
    totalTransactions: reconciliationItems.length,
    matched: reconciliationItems.filter(t => t.status === 'matched').length,
    unmatched: reconciliationItems.filter(t => t.status === 'unmatched').length,
    pending: reconciliationItems.filter(t => t.status === 'pending').length,
    totalVariance: reconciliationItems.reduce((sum, item) => sum + item.variance, 0)
  };

  return (
    <Reconciliation 
      reconciliationItems={reconciliationItems} 
      summary={summary} 
    />
  );
}