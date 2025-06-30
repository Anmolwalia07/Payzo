"use client"
import Chart from "./Chart";
import Link from "next/link";

interface BalanceHistory {
  id: number;
  balance: number;
  userId: number;
  createdAt: string;
}

export interface User {
  name: string;
  balance: {
    amount: number;
    currency: string;
  };
  balanceHistory: BalanceHistory[];
}

interface Merchant{
  category:String;
}

export default function DashHome({ user }: { user: User }) {
  const date = new Date();
  const hour = date.getHours();
  let greeting = "Hello";
  if (hour >= 4 && hour <= 11) {
    greeting = "Good Morning";
  } else if (hour >= 12 && hour <= 16) {
    greeting = "Good Afternoon";
  } else if (hour > 16 && hour <= 19) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }

  // Quick actions
  const quickActions = [
    { name: "Transfer", icon: "↗", color: "bg-blue-500", link: "/transfer" },
    { name: "Pay", icon: "💳", color: "bg-green-500", link: "/transfer" },
    { name: "Top Up", icon: "➕", color: "bg-purple-500", link: "/addmoney" },
    { name: "History", icon: "📊", color: "bg-yellow-500", link: "/transaction" },
  ];

  return (
    <div className="w-full px-4 lg:pl-8 pb-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="capitalize mt-6 text-3xl w-fit lg:text-5xl font-bold lg:ml-2 text-blue-600 tracking-wide">
            {greeting}, <span className="capitalize text-blue-600">{user.name}</span>
          </h1>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-full flex items-center mt-6">
          <span className="text-blue-700 font-medium">Today: {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Balance Card */}
        <div className="lg:col-span-2 bg-gradient-to-r   rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div className="px-2">
                <h2 className="text-xl font-medium">Total Balance</h2>
                <p className="text-3xl font-bold mt-2 text-green-500">{user.balance.amount.toLocaleString()} INR</p>
              </div>
            </div>
          </div>
          <div className="bg-white px-4 py-6">
            <div className="w-full flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Balance History</h3>
            </div>
            <Chart data={user.balanceHistory} />
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow p-6 h-fit">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Link 
                key={index} 
                href={action.link}
                className={`${action.color} rounded-xl p-4 text-white flex flex-col items-center justify-center transition-transform hover:scale-105 shadow-md hover:shadow-lg`}
              >
                <span className="text-2xl mb-2">{action.icon}</span>
                <span className="font-medium">{action.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}