"use client";

import Moneycomponent from "../../../../../packages/ui/dist/MoneyComponent";
import Balance from "@repo/ui/Balance";
import RecentTransactions from "@repo/ui/RecentTransactions";
import {  useUser } from "../UserProvider"; 




export default function Page() {
  const ctx = useUser(); 
  const withdrawTransactions=ctx[0].offRampTransaction.filter(x=>x.provider==='hdfc-bank'|| x.provider==="hdfcbank" || x.provider==="axisbank" || x.amount>0)
  
  return (
    <div className="w-full mb-5 lg:mb-0">
      <h1 className="text-5xl font-bold text-blue-600 mt-6 ml-6">Withdraw</h1>
      <div className="w-full mt-8 pr-3 lg:flex">
        <Moneycomponent user={ctx[0]}  setUser={ctx[1]} text="Withdraw Money"/>
        <div className="w-full lg:w-[50%] px-2 ml-2 mt-2 lg:mt-0 lg:ml-0 lg:px-0">
          <Balance balance={ctx[0].balance} />
          <RecentTransactions recentTransactions={withdrawTransactions.slice(0,2)} text="Withdraw"/>
        </div>
      </div>
    </div>
  );
}
