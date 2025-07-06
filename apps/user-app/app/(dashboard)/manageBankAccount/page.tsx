"use client"
import ManageBankAccount from "@repo/ui/ManageBankAccount"
import { useUser } from "../UserProvider"
export default function page() {
    const ctx=useUser()
  return (
    <ManageBankAccount userId={ctx[0].id}/>
  )
}
