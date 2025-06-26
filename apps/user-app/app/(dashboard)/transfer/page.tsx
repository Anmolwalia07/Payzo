"use client"
import Transfer from "@repo/ui/Transfer"
import {  useUser } from "../UserProvider"; 

export default function Page() {
  const ctx = useUser(); 
  return (
     <Transfer userId={ctx[0].id} balance={ctx[0].balance.amount} setUser={ctx[1]}/>
  );
}
