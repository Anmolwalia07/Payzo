import { prisma } from "@repo/database";
import Main from "@repo/ui/Main"
import Header from "@repo/ui/Header"


async function page() {
  const user=await prisma.user.findMany()
  return (
   <div>
    <Header/>
    <Main/>
   </div>
  )
}

export default page