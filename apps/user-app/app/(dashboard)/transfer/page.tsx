"use client";

import Addmoneycomponent from "@repo/ui/AddMoneyComponent";
import Balance from "@repo/ui/Balance";
import RecentTransactions from "@repo/ui/RecentTransactions";
import {  useUser } from "../UserProvider"; 
import Razorpay from "razorpay";

export default function Page() {
  const ctx = useUser(); 
  return (
    <div className="w-full mb-5 lg:mb-0">
      <h1 className="text-5xl font-bold text-blue-600 mt-6 ml-6">Transfer</h1>
      <div className="w-full mt-8 pr-3 lg:flex">
        <Addmoneycomponent user={ctx[0]} Razorpay={Razorpay} setUser={ctx[1]}/>
        <div className="w-full lg:w-[50%] px-2 ml-2 mt-2 lg:mt-0 lg:ml-0 lg:px-0">
          <Balance balance={ctx[0].balance} />
          <RecentTransactions recentTransactions={ctx[0].OnRampTransaction.slice(0,2)}/>
        </div>
      </div>
    </div>
  );
}
