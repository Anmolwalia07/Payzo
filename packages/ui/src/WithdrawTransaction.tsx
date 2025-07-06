"use client"

// Define OnRampStatus type
export type OnRampStatus = 
  | "SUCCESS" 
  | "FAILURE" 
  | "PROCESSING" 

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

export default function WithdrawTransaction({ offRamping }: { offRamping: OffRampTransactionMerchant[] }) {
  const formatCurrency = (amount: number, currency: string = 'INR') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: OnRampStatus }) => {
    const statusConfig = {
      SUCCESS: { text: "Completed", color: "bg-green-100 text-green-800" },
      FAILURE: { text: "Failed", color: "bg-red-100 text-red-800" },
      PROCESSING: { text: "Processing", color: "bg-yellow-100 text-yellow-800" },
    };

    const config = statusConfig[status] || { text: status, color: "bg-gray-100 text-gray-800" };

    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-8 mt-5">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-blue-500 pb-5">Withdrawal Transactions</h1>
        <p className="text-gray-600 mt-1 text-sm">
          History of all your withdrawal requests
        </p>
      </div>

      {offRamping.length === 0 ? (
        <div className="text-center py-12 border rounded-lg border-gray-200">
          <div className="mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl w-16 h-16 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No withdrawals yet</h3>
          <p className="mt-1 text-gray-500 max-w-md mx-auto">
            Your withdrawal transactions will appear here once you initiate transfers
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Initiated</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {offRamping.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{tx.id}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {formatCurrency(tx.amount)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(tx.startTime)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <StatusBadge status={tx.status} />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    <div className="font-medium">{tx.provider}</div>
                    <div className="text-gray-500 text-xs mt-1">Token: •••••• {tx.token.slice(-6)}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tx.offRamp 
                        ? "bg-purple-100 text-purple-800" 
                        : "bg-cyan-100 text-cyan-800"
                    }`}>
                      {tx.offRamp ? "Withdrawal" : "Deposit"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}