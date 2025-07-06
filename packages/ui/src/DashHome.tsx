"use client"
import axios from "axios";
import Chart from "./Chart";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./LoadingforUi";

interface BalanceHistory {
  id: number;
  balance: number;
  userId: number;
  createdAt: string;
}

export interface User {
  id:Number
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

  const [bankAccount, setBankAccount] = useState({
      name:"",
      accountNumber:0,
      accountBalance:0,
      status:""
  })
  
  const userId=Number(user.id)

  const [loading, setLoading] =useState(true)
  
  const router=useRouter();
  
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_ServerUrl}/api/bankaccount/${userId}`).then((res) => {
       if(res.status===200){
        setBankAccount(res.data.accountDetail);
        setLoading(false)
        } 
      })
      setLoading(false)
  }, []);
  


  return (
    <>
    {loading && <Loading/>}
    <div className="w-full px-4 lg:px-6 lg:pl-8 pb-4 ">
      <div className="flex justify-between items-start ">
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
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* Balance Card */}
        <div className="lg:col-span-2 bg-gradient-to-r   rounded-2xl shadow-lg overflow-hidden h-fit">
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
        <div className="flex flex-col gap-2">
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

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Bank Accounts</h2>
                <button className="text-blue-600 hover:text-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {bankAccount.name!="" ? (
                <div className="p-6">
                  <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">HFDC</h3>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Primary
                      </span>
                    </div>
                    <p className="text-2xl font-mono mt-3 tracking-wider">
                      **** **** **** {bankAccount?.accountNumber.toString().slice(10)}
                    </p>
                    
                    <div className="flex justify-between mt-4 text-sm">
                      <div>
                        <p className="text-gray-500">Account Holder</p>
                        <p>{bankAccount?.name}</p>
                      </div>
                       <div>
                        <p className="text-gray-500">Status</p>
                        <p>{bankAccount?.status}</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-800 font-medium py-2 border border-gray-200 rounded-lg" 
                  onClick={()=>{
                    router.push('/manageBankAccount')
                  }}>
                    Manage Accounts
                  </button>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="mt-4 font-medium text-gray-900">No bank account added</h3>
                  <p className="text-gray-500 mt-1">Connect your bank account to withdraw funds</p>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition" 
                  onClick={()=>{
                    // createBankAccount(user.id,user.name);
                  }}
                  >
                    Add Bank Account
                  </button>
                </div>
              )}
            </div>
        </div>
      </div>
    </div>
    </>
  );
}