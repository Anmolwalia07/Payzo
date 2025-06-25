"use client"
import { useUser } from "../UserProvider"
import Explore from "@repo/ui/Explore"

export default function page() {
  const ctx=useUser();
  return (
    <Explore userId={ctx[0].id}/>
  )
}
