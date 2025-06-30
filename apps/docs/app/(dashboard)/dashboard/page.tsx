"use client"
import { useMerchant } from "../MerchantProvider";

export default function Page() {
  const ctx=useMerchant();
  console.log(ctx)
  return (
    <div>page</div>
  );
}