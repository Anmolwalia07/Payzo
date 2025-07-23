"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { RiBankLine, RiAddLine } from "react-icons/ri";

export default function ManageBankAccount({ userId }: { userId: number }) {
  const [bankAccount, setBankAccount] = useState<{
    name: string;
    accountNumber: string;
    accountBalance: number;
    status: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBankAccount = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ServerUrl}/api/bankaccount/${userId}`
      );
      if (res.status === 200) {
        setBankAccount(res.data.accountDetail);
      } else {
        setError("Failed to fetch account details");
      }
    } catch (err: any) {
      setError(err?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) fetchBankAccount();
    return () => {
      isMounted = false;
    };
  }, [userId]);

  if (loading) {
    return (
      <div className="w-full mb-5 lg:mb-0">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mt-6 mb-4 px-4">
          Bank Account
        </h1>
        <div className="p-6 rounded-xl bg-white">
          <div className="animate-pulse space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-gray-200 rounded-full p-3">
                <RiBankLine className="text-gray-400" size={24} />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded-full w-32"></div>
                <div className="h-3 bg-gray-200 rounded-full w-24"></div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="h-3 bg-gray-200 rounded-full w-20"></div>
                <div className="h-4 bg-gray-200 rounded-full w-48"></div>
              </div>
              <div className="space-y-1">
                <div className="h-3 bg-gray-200 rounded-full w-20"></div>
                <div className="h-4 bg-gray-200 rounded-full w-56"></div>
              </div>
              <div className="space-y-1">
                <div className="h-3 bg-gray-200 rounded-full w-20"></div>
                <div className="h-4 bg-gray-200 rounded-full w-40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mb-5 lg:mb-0">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mt-6 mb-4 px-4">
          Bank Account
        </h1>
        <div className="p-6 rounded-xl bg-red-50">
          <h3 className="text-red-800 font-medium text-lg">Connection Error</h3>
          <p className="text-red-600 mt-2">{error}</p>
          <button
            onClick={fetchBankAccount}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mb-5 lg:mb-0 md:px-10 px-5">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mt-6 mb-4 px-1">
        Bank Account
      </h1>
      
      <div className="p-6 rounded-xl bg-white border-gray-100 shadow px-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-blue-50 p-3 rounded-full text-blue-600">
            <RiBankLine size={24} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">HDFC Bank</h2>
            <p className="text-sm text-gray-500">Linked Bank Account</p>
          </div>
        </div>

        {bankAccount ? (
          <div className="space-y-5">
            <Field label="Account Holder Name" value={bankAccount.name} />
            <Field label="Account Number" value={bankAccount.accountNumber} monospace />
            <Field
              label="Available Balance"
              value={bankAccount.accountBalance.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
              })}
            />
            <div>
              <label className="text-sm text-gray-500">Status</label>
              <div className="flex items-center mt-1">
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    bankAccount.status === "opened" ? "bg-green-500" : "bg-yellow-500"
                  }`}
                ></span>
                <span className="capitalize text-sm">{bankAccount.status}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4">
            <div className="flex flex-col items-center text-center py-6">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <RiBankLine className="text-gray-500" size={28} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No Bank Account
              </h3>
              <p className="text-gray-500 mb-6">
                You haven't linked a bank account yet
              </p>
              <button
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
              >
                <RiAddLine size={18} />
                Create Bank Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const Field = ({
  label,
  value,
  monospace = false,
}: {
  label: string;
  value: string;
  monospace?: boolean;
}) => (
  <div>
    <label className="text-sm text-gray-500">{label}</label>
    <p className={`mt-1 ${monospace ? "font-mono" : "font-medium"} text-gray-800`}>
      {value}
    </p>
  </div>
);