"use client"
import Transfer from "@repo/ui/Transfer"
import {  useUser } from "../UserProvider"; 

export default function Page() {
  const ctx = useUser(); 
  return (
     <Transfer/>
  );
}
