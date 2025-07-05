"use client"
import ProfileForMerchant   from "@repo/ui/ProfileForMerchant"
import { useMerchant } from "../MerchantProvider";
import { Merchant } from "@repo/ui/MerchantHome";

export default  function Page() {
  const ctx=useMerchant();
  const merchant:Merchant |any=ctx[0];
  return (
    <div className="h-full w-full overflow-y-scroll">
      <ProfileForMerchant merchant={merchant}/>
    </div>
  );
}