"use client"
import { useState, useEffect } from 'react';
import { 
  FiSearch, 
  FiFilter, 
  FiShoppingBag, 
  FiCoffee, 
  FiHome, 
  FiCreditCard, 
  FiDollarSign, 
  FiTrendingUp,
  FiX,
  FiClock,
  FiCheckCircle,
  FiAlertCircle
} from 'react-icons/fi';

interface Merchant {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
}

interface Transaction {
  id: number;
  merchantId: number;
  merchantName: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  type: 'payment' | 'refund';
}

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        const merchantsRes = await fetch('/api/merchants',{
          method:'GET',
           headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!merchantsRes.ok) throw new Error('Failed to fetch merchants');
        const merchantsData = await merchantsRes.json();
        
        const transactionsRes = await fetch('/api/transactions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!transactionsRes.ok) throw new Error('Failed to fetch transactions');
        const transactionsData = await transactionsRes.json();
        
        setMerchants(merchantsData);
        setTransactions(transactionsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredMerchants = merchants.filter(merchant => {
    const matchesSearch = merchant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || merchant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const transactionsByMerchant: Record<string, Transaction[]> = {};
  transactions.forEach(transaction => {
    if (!transactionsByMerchant[transaction.merchantId]) {
      transactionsByMerchant[transaction.merchantId] = [];
    }
    transactionsByMerchant[transaction.merchantId]?.push(transaction);
  });

  const categories = [
    { id: 'all', name: 'All', icon: <FiShoppingBag /> },
    { id: 'electronics', name: 'Electronics', icon: <FiTrendingUp /> },
    { id: 'clothing', name: 'Clothing', icon: <FiShoppingBag /> },
    { id: 'food', name: 'Food', icon: <FiCoffee /> },
    { id: 'home', name: 'Home', icon: <FiHome /> },
    { id: 'books', name: 'Books', icon: <FiCreditCard /> },
  ];

  const handleViewDetails = (merchant: Merchant) => {
    setSelectedMerchant(merchant);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedMerchant(null);
  };

  // const getMerchantTransactions = () => {
  //   if (!selectedMerchant) return [];
  //   return transactionsByMerchant[selectedMerchant.id] || [];
  // };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-xl max-w-md mx-auto">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 border-l border-gray-300 h-full overflow-y-scroll">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-blue-500 mb-2">Explore Merchants</h1>
          <p className="text-gray-600">Discover new merchants and view your transaction history</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search for merchants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filters */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Filter by Category</h2>
              <button className="flex items-center text-sm text-gray-600 hover:text-blue-600">
                <FiFilter className="mr-1" /> Filter
              </button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`flex items-center px-4 py-2 rounded-xl transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Merchants Section */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Merchants</h2>
            <p className="text-gray-600">
              {filteredMerchants.length} {filteredMerchants.length === 1 ? 'merchant' : 'merchants'} found
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="bg-gray-200 rounded-xl w-12 h-12" />
                      <div className="ml-4 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="mt-4 h-3 bg-gray-200 rounded w-full"></div>
                    <div className="mt-4 flex justify-between">
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredMerchants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMerchants.map(merchant => (
                <div key={merchant.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                        {merchant.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">{merchant.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{merchant.category}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-5 w-5 ${i < Math.floor(merchant.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{merchant.rating} ({merchant.reviewCount} reviews)</span>
                    </div>
                    
                    <div className="mt-6 flex justify-between items-center">
                      <button 
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        onClick={() => handleViewDetails(merchant)}
                      >
                        View Details
                      </button>
                      
                      {transactionsByMerchant[merchant.id] && (
                        <div className="text-sm text-gray-600">
                          {transactionsByMerchant[merchant.id]?.length} transaction{transactionsByMerchant[merchant.id]?.length !== 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <FiSearch className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No merchants found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We couldn't find any merchants matching your search. Try different keywords or filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {showDetailModal && selectedMerchant && (
        <div className="fixed inset-0 bg-[#ffffffb2] bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">{selectedMerchant.name}</h2>
              <button 
                onClick={closeDetailModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
            
            {/* Merchant Info */}
            <div className="p-6">
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  {selectedMerchant.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <div className="flex items-center mb-2">
                    {selectedMerchant?.category && <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm capitalize">
                      {selectedMerchant.category}
                    </span>}
                    <div className="flex ml-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(selectedMerchant.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">
                      {selectedMerchant.rating} ({selectedMerchant.reviewCount} reviews)
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Merchant ID: {selectedMerchant.id}
                  </p>
                </div>
              </div>
              
              {/* Transactions Section */}
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Transactions
              </h3>
              
              {(() => {
                // Safely get transactions for this merchant
                const merchantTransactions = transactionsByMerchant[selectedMerchant.id] || [];
                
                return merchantTransactions.length > 0 ? (
                  <div className="space-y-4">
                    {merchantTransactions
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .slice(0, 5)
                      .map(transaction => (
                        <div key={transaction.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                          <div>
                            <div className="flex items-center mb-1">
                              {transaction.status === 'completed' && (
                                <FiCheckCircle className="text-green-500 mr-2" />
                              )}
                              {transaction.status === 'pending' && (
                                <FiClock className="text-yellow-500 mr-2" />
                              )}
                              {transaction.status === 'failed' && (
                                <FiAlertCircle className="text-red-500 mr-2" />
                              )}
                              <span className="font-medium capitalize">
                                {transaction.status}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(transaction.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                          </div>
                          
                          <div className={`text-right ${
                            transaction.type === 'refund' ? 'text-green-600' : 'text-gray-800'
                          }`}>
                            <div className="font-medium">
                              {transaction.type === 'refund' ? '+' : '-'}
                              ₹{transaction.amount.toFixed(2)}
                            </div>
                            <div className="text-sm capitalize text-gray-500">
                              {transaction.type}
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-8 text-center">
                    <FiDollarSign className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600">No transactions found for this merchant</p>
                  </div>
                );
              })()}
              
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={closeDetailModal}
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;