import { prisma } from "@repo/database";
import Allusers from "@repo/ui/Allusers"

export default async function page(){
  const users:any[]=await prisma.user.findMany({
      select:{
        id:true,
        email:true,
        name:true,
        balance:true,
        createdAt:true,
        status:true
      }})
  return (
    <Allusers users={users}/>
  )
}
