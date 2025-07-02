"use client"
import Personalnfo from "@repo/ui/Personalnfo"
import Perferences from "@repo/ui/Perferences"
import { useMerchant } from "../../MerchantProvider";
export default function page() {
  const ctx=useMerchant();

  const merchantInfo={
    id:Number(1000000+ctx[0].id),
    name:ctx[0].name,
    email:ctx[0].email
  }
  return (
     <div className="w-full py-5  md:h-[77%] px-4  overflow-y-scroll overflow-x-hidden flex flex-col gap-6 mt-4">
    <Personalnfo userInfo={merchantInfo}/>
      <Perferences/>
      </div>
  )
}
