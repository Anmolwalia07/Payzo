import { Transactions } from "./Transactions";
function Transaction({ t }: { t: Transactions|any }) {
  const isDeposit = t.onRamp;
const isMerchant = (
  t.provider !== "hdfcbank" &&
  t.provider !== "hdfc-bank" &&
  t.provider !== "axisbank" &&
  t.provider !== "razorpay"
);
  const statusColors: Record<string, string> = {
    Success: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Failed: "bg-red-100 text-red-800",
    Processing: "bg-blue-100 text-blue-800",
  };
  
  const statusColor = statusColors[t.status] || "bg-gray-100 text-gray-800";
  
  return (
    <div className="w-full flex items-center rounded-xl bg-white shadow-sm p-4 mb-3 border border-gray-100 hover:shadow-md transition-shadow">
      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
        isDeposit ? "bg-green-500/20 text-green-700" : "bg-red-500/20 text-red-700"
      }`}>
        {isDeposit ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
          </svg>
        )}
      </div>

      {/* Transaction Details */}
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-semibold text-gray-800">
            {isMerchant && `${t.provider} Merchant`}  {isDeposit && "Deposit"} {(!isMerchant && !isDeposit ) && "Withdraw"}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(t.startTime).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          
          <div className="text-right">
            <p className={`font-bold ${isDeposit ? 'text-green-600' : 'text-red-600'}`}>
              {isDeposit ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
        
        {/* Transaction ID and Status */}
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs font-mono text-gray-500 truncate max-w-[120px] md:max-w-xs">
            ID: {t.id}
          </p>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColor}`}>
            {t.status}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Transaction