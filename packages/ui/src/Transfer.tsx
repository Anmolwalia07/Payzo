import axios from 'axios';
import { useState, useEffect } from 'react';
interface Merchant {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  logo: string;
}

export default function Transfer({userId,setUser,balance}:{userId:Number,setUser:any,balance:Number}) {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [transferSuccess, setTransferSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/merchants');
        if (!response.ok) {
          throw new Error('Failed to fetch merchants');
        }
        const data = await response.json();
        setMerchants(data);
      } catch (error) {
        console.error('Error fetching merchants:', error);
        setError('Failed to load merchants. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMerchants();
  }, []);

  const handleMerchantSelect = (merchant: Merchant) => {
    setSelectedMerchant(merchant);
    setError('');
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMerchant) {
      setError('Please select a merchant');
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    let token="";

    let offRampingTransaction;
    let transaction;
    
    try {

       offRampingTransaction=await axios.post('/api/offRamping',{provider:selectedMerchant.name,userId:userId,amount:Number(amount)});
      if(offRampingTransaction.data){
        token=offRampingTransaction.data?.token
      }

       transaction=await axios.post('api/merchantTransfer',{amount:Number(amount),merchantId:Number(selectedMerchant.id),userId:userId,merchantName:selectedMerchant.name})
      if(transaction.status===201){
        const transferTheMoney=await axios.post('/api/transferTheMoney',{id:Number(transaction.data.id),token:token,userId:userId})
        if(transferTheMoney.status===201){
          const newuser=await axios.get('/api/data');
          setUser(newuser.data.user);
           setTransferSuccess(true);
         setTimeout(() => {
         setSelectedMerchant(null);
         setAmount('');
         setNote('');
         setTransferSuccess(false);
      }, 3000);

      }
      }     
    } catch (err) {
      if(offRampingTransaction){
        await axios.put(`${process.env.NEXT_PUBLIC_ServerUrl}/api/offRamping`,{
        token,
        userId
      })
      }
          const newuser=await axios.get('/api/data');
          setUser(newuser.data.user);
          setError('Transfer failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredMerchants = merchants.filter(merchant => 
    merchant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:px-6 overflow-hidden h-full">
      <div className="w-full mx-auto bg-white rounded-2xl shadow-xl overflow-y-scroll overflow-x-hidden h-full">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <div className='flex justify-between items-end'>
          <h1 className="text-2xl font-bold">Transfer Funds</h1>
          <h1 className="text-2xl font-bold">Balance</h1>
          </div>
          <div className='flex justify-between items-end'><p className="opacity-90 mt-1">Send money to merchants securely</p>
          <h1 className="text-xl font-bold">{balance.toLocaleString()} INR</h1></div>
        </div>
        
        {transferSuccess ? (
          <div className="text-center py-10 px-6">
            <div className="mx-auto w-24 h-24 flex items-center justify-center bg-green-100 rounded-full mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Transfer Successful!</h3>
            <p className="text-gray-600 mb-4">
              ${amount} sent to {selectedMerchant?.name}
            </p>
            <div className="mt-6">
              <button 
                onClick={() => setTransferSuccess(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Make Another Transfer
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            {/* Merchant Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-gray-700 font-medium">Select Merchant</label>
                <span className="text-xs text-gray-500">
                  {selectedMerchant ? "Selected: " + selectedMerchant.name : "None selected"}
                </span>
              </div>
              
              {/* Search Bar */}
              <div className="relative mb-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search merchants..."
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 p-4 rounded-lg text-red-700 text-center">
                  {error}
                </div>
              ) : filteredMerchants.length === 0 ? (
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <p className="text-yellow-700">No merchants found matching "{searchQuery}"</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-60 overflow-y-auto p-1">
                  {filteredMerchants.map((merchant) => (
                    <div
                      key={merchant.id}
                      onClick={() => handleMerchantSelect(merchant)}
                      className={`p-3 border rounded-lg cursor-pointer flex flex-col items-center transition-all ${
                        selectedMerchant?.id === merchant.id
                          ? 'border-blue-500 bg-blue-50 shadow-sm transform'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg mb-2">
                        {merchant.logo}
                      </div>
                      <span className="text-sm text-center font-medium text-gray-800">{merchant.name}</span>
                      <div className="mt-1 flex items-center">
                        <span className="text-xs text-yellow-500">★</span>
                        <span className="text-xs text-gray-500 ml-1">{merchant.rating} ({merchant.reviewCount})</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Amount Input */}
            <div className="mb-6">
              <label htmlFor="amount" className="block text-gray-700 mb-2 font-medium">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">INR</span>
                <input
                  type="text"
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0.00"
                  className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
                />
              </div>
            </div>

            {/* Transfer Summary */}
            {selectedMerchant && amount && (
              <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-700 mb-3 text-center">Transfer Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Recipient:</span>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs mr-2">
                        {selectedMerchant.logo}
                      </div>
                      <span className="font-medium">{selectedMerchant.name}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Amount:</span>
                    <span className="font-medium">INR {amount}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Fee:</span>
                    <span className="font-medium">INR 0.00</span>
                  </div>
                  <div className="h-px bg-gray-200 my-2"></div>
                  <div className="flex justify-between text-gray-800 font-semibold">
                    <span>Total:</span>
                    <span>INR {amount}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 bg-red-50 p-3 rounded-lg text-red-700 text-sm flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !selectedMerchant || !amount}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all shadow-md ${
                isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : !selectedMerchant || !amount
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Transfer Now'
              )}
            </button>
          </form>
        )}
        
        {/* Security Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 text-center">
          <div className="flex items-center justify-center text-gray-500 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Secure & Encrypted Transfers</span>
          </div>
          <p className="text-xs text-gray-400">All transactions are protected with bank-level security</p>
        </div>
      </div>
    </div>
  );
}