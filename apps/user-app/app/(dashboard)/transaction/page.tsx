"use client";
import Transaction from "@repo/ui/Transactions";
import {  useUser } from "../UserProvider"; 
 interface Transactions {
  id: string;
  amount: number;
  provider: string;
  status: string;
  startTime: string; 
  onRamp?:boolean,
  offRamp?:boolean
  userId:number,
}
export default function Page() {
  const ctx = useUser();

const copy:Transactions[] | any= [
  ...ctx[0].OnRampTransaction.map((t)=>({
    id:`ON-R-TID-${t.id}`,
    amount:t.amount,
    provider:t.provider,
    status: t.status,
    startTime: t.startTime, 
    onRamp:t?.onRamp,
    userId:t.userId,
  })),
  ...ctx[0].offRampTransaction.map((t)=>({
    id:`OFF-R-TID-${t.id}`,
    amount:t.amount,
    provider:t.provider,
    status: t.status,
    startTime: t.startTime, 
    offRamp:t.offRamp,
    userId:t.userId,
  }))
];

const transaction: Transactions[] | any = copy.sort(
  (a:Transactions, b:Transactions) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
);
  return (
    <Transaction transactions={transaction}/>
  );
}
