"use client"
import { useState } from "react";
import Transaction from "./Transaction";

export interface Transactions {
  id: number;
  amount: number;
  provider: string;
  status: string;
  startTime: string;
  onRamp?:boolean,
  offRamp?:boolean 
  userId:number
}

function Transactions({transactions}:Transactions[]|any) {
  const [filter, setFilter] = useState<'all' | 'onRamp' | 'offRamp'>('all');

const filteredTransactions = transactions.filter((t:Transactions) => {
  if (filter === 'onRamp') return t.onRamp;
  if (filter === 'offRamp') return !t.onRamp;
  return true; 
});
  return (
    <div className="w-full mb-5 lg:mb-0 md:h-[90%] px-4">
      <h1 className="text-5xl font-bold text-blue-600 mt-6 ml-2">Transactions</h1>
      <h1 className="text-xl font-bold mt-6 ml-6 bg-white shadow border border-gray-300 w-fit px-3 rounded-2xl py-1">Histroy</h1>
     <div className="w-full mt-5 px-4 flex flex-col h-[80%] overflow-x-hidden py-3 bg-white shadow border border-gray-200 rounded-4xl">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold mt-6 ml-2 mb-3">Transactions</h1>
        {/* Filter Buttons */}
        <div className="flex space-x-2 mt-4">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-sm rounded-full ${filter === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('onRamp')}
            className={`px-3 py-1 text-sm rounded-full ${filter === 'onRamp' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            Deposit
          </button>
          <button 
            onClick={() => setFilter('offRamp')}
            className={`px-3 py-1 text-sm rounded-full ${filter === 'offRamp' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            Withdraw
          </button>
        </div>
      </div>

      <div className="overflow-y-scroll overflow-x-hidden mt-4">
        {filteredTransactions.length >= 1 ? (
          filteredTransactions.map((t: Transactions) => (
            <Transaction 
              key={`${t.id} ${t.onRamp ? "onRamp" : "offRamp"}`} 
              t={t} 
            />
          ))
        ) : (
          <div className="w-full flex justify-center mt-4 font-bold text-xl">
            No transactions found...
          </div>
        )}
      </div>
    </div>
    </div>
  )
}

export default Transactions