"use client";
import { useState } from "react";

export interface Transaction {
  id: string;
  amount: number;
  provider: string;
  status: string;
  startTime: string;
  onRamp?: boolean;
  offRamp?: boolean;
  userId: number;
  date: any;
}

function Transactions({ transactions }: { transactions: Transaction[] }) {
  const [filter, setFilter] = useState<"all" | "onRamp" | "offRamp">("all");
  const [sortConfig, setSortConfig] = useState<{ key: keyof Transaction; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const filteredTransactions = transactions.filter((t) => {
    if (filter === "onRamp") return t.onRamp;
    if (filter === "offRamp") return t.offRamp;
    return true;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (!sortConfig) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = sortedTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const requestSort = (key: keyof Transaction) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const getSortIcon = (key: keyof Transaction) => {
    if (!sortConfig || sortConfig.key !== key) return '⇅';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const statusColors: Record<string, string> = {
    Success: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Failed: "bg-red-100 text-red-800",
    Processing: "bg-blue-100 text-blue-800",
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mb-8">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-blue-600 mt-3">
          Transactions
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          View all your deposit and withdrawal activity below
        </p>
      </div>

      <div className="bg-white shadow-lg border border-gray-200 rounded-3xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Filter by Type</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "All", value: "all" },
              { label: "Deposit", value: "onRamp" },
              { label: "Withdraw", value: "offRamp" },
            ].map((btn) => (
              <button
                key={btn.value}
                onClick={() => {
                  setFilter(btn.value as typeof filter);
                  setCurrentPage(1);
                }}
                className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 ${
                  filter === btn.value
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full overflow-x-auto rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 text-left cursor-pointer" onClick={() => requestSort('startTime')}>
                  <div className="flex items-center">Date & Time {getSortIcon('startTime')}</div>
                </th>
                <th className="px-4 py-3 text-left cursor-pointer" onClick={() => requestSort('onRamp')}>
                  <div className="flex items-center">Type {getSortIcon('onRamp')}</div>
                </th>
                <th className="px-4 py-3 text-left">Provider/Merchant</th>
                <th className="px-4 py-3 text-left cursor-pointer" onClick={() => requestSort('amount')}>
                  <div className="flex items-center">Amount {getSortIcon('amount')}</div>
                </th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Transaction ID</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm sm:text-base">
              {currentTransactions.length > 0 ? (
                currentTransactions.map((t) => {
                  const isDeposit = t.onRamp;
                  const isMerchant = !["hdfcbank", "hdfc-bank", "axisbank", "razorpay"].includes(t.provider);
                  return (
                    <tr key={`${t.id}-${isDeposit ? "onRamp" : "offRamp"}`} className="hover:bg-gray-50">
                      <td className="px-4 py-3 break-words whitespace-normal text-gray-600">{formatDate(t.startTime)}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {isDeposit ? (
                            <span className="text-green-600">⬆️</span>
                          ) : (
                            <span className="text-red-500">⬇️</span>
                          )}
                          <span>
                            {isMerchant && isDeposit
                              ? "Merchant Deposit"
                              : isDeposit
                              ? "Deposit"
                              : "Withdraw"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-800 capitalize">{t.provider}</td>
                      <td className={`px-4 py-3 font-semibold ${isDeposit ? 'text-green-600' : 'text-red-600'}`}>
                        {isDeposit ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${statusColors[t.status] || "bg-gray-100 text-gray-800"}`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono break-words">{t.id}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                    No transactions found...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {sortedTransactions.length > 0 && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 border-t border-gray-200 pt-4 gap-4">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(indexOfLastItem, sortedTransactions.length)}
              </span>{" "}
              of <span className="font-medium">{sortedTransactions.length}</span> results
            </div>
            <div className="flex flex-wrap items-center space-x-2 overflow-x-auto">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 text-sm rounded-md ${
                  currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Previous
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) pageNum = i + 1;
                else if (currentPage <= 3) pageNum = i + 1;
                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                else pageNum = currentPage - 2 + i;

                return (
                  <button
                    key={pageNum}
                    onClick={() => paginate(pageNum)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      currentPage === pageNum ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 text-sm rounded-md ${
                  currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Transactions;
