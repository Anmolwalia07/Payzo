"use client"

import axios from "axios";
import { useEffect } from "react";
import {useRouter} from "next/navigation"

export type BalanceHistoryMerchant = {
  id: number;
  merchantId: number;
  balance: number;
  createdAt: string; // DateTime → ISO string
};

export type OffRampTransactionMerchant = {
  id: number;
  status: OnRampStatus;
  token: string;
  provider: string;
  amount: number;
  startTime: string;
  offRamp: boolean;
  merchantId: number;
};

export type BalanceMerchant = {
  id: number;
  merchantId: number;
  amount: number;
  locked: number;
};

export type PaymentTransaction = {
  id: number;
  merchantId: number;
  merchantName: string;
  amount: number;
  date: string;
  status: PaymentStatus;
  type: PaymentType;
  userId: number;
};

export enum OnRampStatus {
  Success = "Success",
  Failure = "Failure",
  Processing = "Processing",
}

export enum PaymentStatus {
  completed = "completed",
  pending = "pending",
  failed = "failed",
}

export enum PaymentType {
  payment = "payment",
  refund = "refund",
}

export type Merchant = {
  id: number;
  name: string;
  email: string;
  password?: string | null;
  category: string;
  rating: number;
  reviewCount: number;
  balance?: BalanceMerchant | null;
  balancehistroy: BalanceHistoryMerchant[];
  offRampTransaction: OffRampTransactionMerchant[];
  transactions: PaymentTransaction[];
  createdAt: string;
  updatedAt: string;
};


export default function MerchantHome({ merchant ,setMerchant}: { merchant: Merchant | any ,setMerchant:any}) {
  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits:0
    }).format(amount);
  };

  // Helper to format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const router=useRouter();

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

  useEffect(() => {
  let isMounted = true;
  let intervalId: NodeJS.Timeout;

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/merchantData');
      if (isMounted) {
        setMerchant(res.data.merchant);
      }
    } catch (error) {
      console.error("Failed to fetch merchant data:", error);
    }
  };

  fetchData();

  intervalId = setInterval(fetchData, 30000);

  return () => {
    isMounted = false;
    clearInterval(intervalId);
  };
}, []);

  return (
    <div className="h-[100%] overflow-y-scroll overflow-x-hidden p-4 md:p-8">
        <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="capitalize text-3xl w-fit lg:text-5xl font-bold lg:ml-2 text-blue-600 tracking-wide">
            {greeting}, <span className="capitalize text-blue-600">{merchant.name}</span>
          </h1>
        </div>
        <div className="md:bg-blue-50 px-4 py-2 rounded-full flex items-center ">
          <span className="text-blue-700 font-medium">Today: {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>
      
      {/* Balance Summary */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Available Balance</h2>
          <p className="text-3xl font-bold text-gray-800">
            {merchant.balance ? formatCurrency(merchant.balance.amount) : formatCurrency(0)}
          </p>
          <div className="mt-4">
            <p className="text-gray-500 text-sm">Locked Funds</p>
            <p className="text-lg text-gray-700">
              {merchant.balance ? formatCurrency(merchant.balance.locked) : formatCurrency(0)}
            </p>
          </div>
        </div>

        {/* Recent Balance History */}
      </section>

      {/* Transactions Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Payment Transactions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700" >Recent Payments</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800" onClick={()=>{
                router.push('/transaction')
            }}>View All</button>
          </div>
          <div className="overflow-x-auto ">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 ">
                {merchant.transactions.slice(0, 4).map((tx: PaymentTransaction) => (
                  <tr key={tx.id}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">User #{tx.userId}</p>
                      <p className="text-xs text-gray-500 capitalize">{tx.type}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className={`text-sm font-medium ${tx.type === 'refund' ? 'text-red-600' : 'text-green-600'}`}>
                        {tx.type === 'refund' ? '-' : ''}{formatCurrency(tx.amount)}
                      </p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(tx.date)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        tx.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : tx.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Off-Ramp Transactions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Withdrawals</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Provider</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {merchant.offRampTransaction.slice(0, 5).map((tx: OffRampTransactionMerchant) => (
                  <tr key={tx.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {tx.provider}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 font-medium">
                      -{formatCurrency(tx.amount)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(tx.startTime)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        tx.status === 'Success' 
                          ? 'bg-green-100 text-green-800' 
                          : tx.status === 'Processing' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="bg-white rounded-xl shadow-sm p-6 col-span-1 md:col-span-2 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Recent Balance History</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div className="space-y-4">
            {merchant.balancehistroy.slice(0, 3).map((history: BalanceHistoryMerchant) => (
              <div key={history.id} className="flex justify-between border-b pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">Balance Update</p>
                  <p className="text-sm text-gray-500">{formatDate(history.createdAt)}</p>
                </div>
                <p className={`text-lg font-semibold ${history.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(history.balance)}
                </p>
              </div>
            ))}
          </div>
        </div>

      {/* Stats Summary */}
      <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">
              {merchant.transactions.filter((t: PaymentTransaction) => t.status === 'completed').length}
            </p>
            <p className="text-sm text-gray-600">Successful Payments</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">
              {merchant.transactions.filter((t: PaymentTransaction) => t.status === 'pending').length}
            </p>
            <p className="text-sm text-gray-600">Pending Payments</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">
              {merchant.offRampTransaction.filter((t: OffRampTransactionMerchant) => t.status === 'Success').length}
            </p>
            <p className="text-sm text-gray-600">Completed Withdrawals</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">
              {merchant.reviewCount}
            </p>
            <p className="text-sm text-gray-600">Customer Reviews</p>
          </div>
        </div>
      </section>
    </div>
  );
}