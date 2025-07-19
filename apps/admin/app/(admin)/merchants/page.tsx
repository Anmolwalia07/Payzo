import { prisma } from "@repo/database"
import AllMerchants from "@repo/ui/AllMerchants"

export default async function page() {
  const merchs:any[]=await prisma.merchant.findMany({
    select:{
        id:true,
        email:true,
        name:true,
        balance:true,
        createdAt:true,
        status:true
      }})
  return (
    <AllMerchants  Merchants={merchs}/>
  )
}
