"use client"
import MerchantHome from "@repo/ui/MerchantHome";
import { useMerchant } from "../MerchantProvider";

export default function Page() {
  const ctx=useMerchant();
  return (
    <MerchantHome merchant={ctx[0]} setMerchant={ctx[1]}/>
  );
}