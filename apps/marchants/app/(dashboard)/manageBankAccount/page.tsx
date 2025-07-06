"use client"
import ManageBankAccount from "@repo/ui/ManageBankAccount"
import { useMerchant } from "../MerchantProvider"
export default function page() {
    const ctx=useMerchant()
  return (
    <ManageBankAccount userId={Number(1000000+(ctx[0].id))}/>
  )
}
