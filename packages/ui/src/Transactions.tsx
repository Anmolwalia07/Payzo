"use client";
import { useState } from "react";
import Transaction from "./Transaction";

export interface Transactions {
  id: number;
  amount: number;
  provider: string;
  user: any;
  status: string;
  startTime: string;
  onRamp?: boolean;
  offRamp?: boolean;
  userId: number;
  date: any;
  type: any;
}

function Transactions({ transactions }: Transactions[] | any) {
  const [filter, setFilter] = useState<"all" | "onRamp" | "offRamp">("all");

  const filteredTransactions = transactions.filter((t: Transactions) => {
    if (filter === "onRamp") return t.onRamp;
    if (filter === "offRamp") return !t.onRamp;
    return true;
  });

  return (
    <div className="w-full px-4 mb-8">
      <div className="mb-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-blue-600 mt-3">
          Transactions
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mt-1">
          View all your deposit and withdrawal activity below
        </p>
      </div>

      <div className="w-full bg-white shadow-lg border border-gray-200 rounded-3xl px-4 py-5">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 sm:mb-0">
            Filter by Type
          </h2>
          <div className="flex space-x-2">
            {[
              { label: "All", value: "all" },
              { label: "Deposit", value: "onRamp" },
              { label: "Withdraw", value: "offRamp" },
            ].map((btn) => (
              <button
                key={btn.value}
                onClick={() => setFilter(btn.value as typeof filter)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 border ${
                  filter === btn.value
                    ? "bg-blue-600  text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-transparent"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-y-auto max-h-[60vh] pr-1 custom-scroll">
          {filteredTransactions.length >= 1 ? (
            filteredTransactions.map((t: Transactions) => (
              <Transaction
                key={`${t.id}-${t.onRamp ? "onRamp" : "offRamp"}`}
                t={t}
              />
            ))
          ) : (
            <div className="w-full flex justify-center mt-6 text-gray-500 text-lg font-medium">
              No transactions found...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Transactions;
