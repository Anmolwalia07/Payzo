"use client";
import Transaction from "@repo/ui/Transactions";
import {  useUser } from "../UserProvider"; 
 interface Transactions {
  id: number;
  amount: number;
  provider: string;
  status: string;
  startTime: string; 
  onRamp?:boolean,
  offRamp:boolean
  userId:number
}
export default function Page() {
  const ctx = useUser();

const copy:Transactions[] | any= [
  ...ctx[0].OnRampTransaction,
  ...ctx[0].offRampTransaction
];

const transaction: Transactions[] = copy.sort(
  (a:Transactions, b:Transactions) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
);
  return (
    <Transaction transactions={transaction}/>
  );
}
