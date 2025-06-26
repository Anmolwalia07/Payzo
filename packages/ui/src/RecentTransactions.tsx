import Link from 'next/link';

enum OnRampStatus {
  Success,
  Failure,
  Processing,
}

type Transaction = {
  id: number;
  status: OnRampStatus;
  token: string;
  provider: string;
  amount: number;
  startTime: Date;
  userId: number;
};

export default function RecentTransactions({
  recentTransactions,
  text
}: {
  recentTransactions: Transaction[];
  text: string;
}) {
  const getStatusInfo = (status: OnRampStatus) => {
    switch (status) {
      case OnRampStatus.Success:
        return { text: 'Success', color: 'bg-green-100 text-green-700', icon: '✓' };
      case OnRampStatus.Failure:
        return { text: 'Failed', color: 'bg-red-100 text-red-700', icon: '✕' };
      case OnRampStatus.Processing:
        return { text: 'Processing', color: 'bg-yellow-100 text-yellow-700', icon: '↻' };
      default:
        return { text: 'Unknown', color: 'bg-gray-100 text-gray-700', icon: '?' };
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {recentTransactions.length > 0 ? (
          recentTransactions.map((trans) => {
            const statusInfo = getStatusInfo(trans.status);
            return (
              <div
                key={trans.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                      {text.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{text}</h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(trans.startTime)}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-800">
                      {formatAmount(trans.amount)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {trans.provider}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-gray-500">No transactions found</p>
            <p className="text-sm text-gray-400 mt-1">
              Your recent transactions will appear here
            </p>
          </div>
        )}
      </div>

      <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center">
        <Link href="/transaction">
          <button className="flex items-center px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
            <span>View All Transactions</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}
