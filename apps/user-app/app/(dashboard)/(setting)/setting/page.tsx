"use client"
import { useUser } from "../../UserProvider"
import Personalnfo, { UserInfo } from "@repo/ui/Personalnfo"
import Perferences from "@repo/ui/Perferences"
export default function page() {
  const ctx=useUser();
  const userInfo:UserInfo={
    id:ctx[0].id,
    email:ctx[0].email,
    name:ctx[0].name
  }
  return (
     <div className="w-full py-5  md:h-[77%] px-4  overflow-y-scroll overflow-x-hidden flex flex-col gap-6 mt-4">
    <Personalnfo userInfo={userInfo}/>
      <Perferences/>
      </div>
  )
}
