import { useEffect } from 'react';

interface TransactionPopupProps {
  type: 'add' | 'withdraw';
  success: boolean;
  amount: number;
  onClose: () => void;
}

const TransactionPopup = ({ 
  type, 
  success, 
  amount, 
  onClose 
}: TransactionPopupProps) => {
  // Auto-close success popups after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, onClose]);

  // Determine UI elements based on state
  const title = success ? "Success!" : "Transaction Failed";
  
  const message = success
    ? type === 'add'
      ? `₹${amount.toLocaleString()} added successfully!`
      : `₹${amount.toLocaleString()} withdrawn successfully!`
    : type === 'add'
      ? `Failed to add ₹${amount.toLocaleString()}`
      : `Failed to withdraw ₹${amount.toLocaleString()}`;

  const icon = success ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black/30">
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 animate-fade-in">
        
        {/* Header with Icon */}
        <div className={`p-6 flex justify-center items-center 
        ${success 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
            : 'bg-gradient-to-r from-red-500 to-red-700'}`}>
        <div className="text-white text-5xl animate-bounce-slow">
            {icon}
        </div>
        </div>

        {/* Body */}
        <div className="p-8 text-center space-y-4">
        <h3 className={`text-3xl font-extrabold tracking-tight 
            ${success ? 'text-blue-700' : 'text-red-700'}`}>
            {title}
        </h3>
        <p className="text-gray-600 text-lg leading-relaxed">{message}</p>

        <div className="pt-4">
            <button
            onClick={onClose}
            className={`py-2.5 px-8 rounded-full font-semibold shadow-md transition-all duration-300
                ${success 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' 
                : 'bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800'}
                text-white`}
            >
            {success ? 'Continue' : 'Try Again'}
            </button>
        </div>
        </div>

        {/* Auto-close progress bar (only for success) */}
        {success && (
        <div className="h-2 w-full bg-blue-100 overflow-hidden rounded-b-3xl">
            <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 animate-progress"
            style={{ animationDuration: '3s' }}
            ></div>
        </div>
        )}
    </div>
    </div>


  );
};

export default TransactionPopup;