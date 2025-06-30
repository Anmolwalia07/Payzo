"use client"
import MerchantHome from "@repo/ui/MerchantHome";
import { useMerchant } from "../MerchantProvider";

export default function Page() {
  const ctx=useMerchant();
  const setMerchant=ctx[1]
  console.log(ctx[1]);

  return (
    <MerchantHome merchant={ctx[0]} setMerchant={ctx[1]}/>
  );
}