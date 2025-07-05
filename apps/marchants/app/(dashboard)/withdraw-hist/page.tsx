"use client"
import WithdrawTransaction from "@repo/ui/WithdrawTransaction"
import { useMerchant } from "../MerchantProvider"
import { OffRampTransactionMerchant } from "@repo/ui/MerchantHome";
export default function page() {
  const ctx=useMerchant();
  const offRampTransaction:OffRampTransactionMerchant[]|any=ctx[0]?.offRampTransaction
  return (
    <WithdrawTransaction offRamping={offRampTransaction}/>
  )
}
