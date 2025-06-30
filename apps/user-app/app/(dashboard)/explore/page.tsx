<<<<<<< HEAD
"use client"
import { useUser } from "../UserProvider"
import Explore from "@repo/ui/Explore"

export default function page() {
  const ctx=useUser();
  return (
    <Explore userId={ctx[0].id}/>
=======

export default function page() {
  return (
    <div>page</div>
>>>>>>> parent of 3e5d1f2 (Merchant added)
  )
}
