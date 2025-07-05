"use client"
import { useMerchant } from "../MerchantProvider"
import MerchantTransaction from "@repo/ui/MerchantTransaction"

function page() {
    const ctx=useMerchant()
    console.log(ctx[0])
  return (
    <MerchantTransaction merchant={ctx[0]} setMerchant={ctx[1]}/>
  )
}

export default page