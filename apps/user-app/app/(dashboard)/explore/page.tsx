"use client"
import { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiShoppingBag, FiCoffee, FiHome, FiCreditCard, FiDollarSign, FiTrendingUp } from 'react-icons/fi';

interface Merchant {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  logo: string;
}

interface Transaction {
  id: string;
  merchantId: string;
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

  // Mock data - in a real app this would come from an API
  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setMerchants([
        { id: '1', name: 'TechGadgets', category: 'electronics', rating: 4.7, reviewCount: 245, logo: 'TG' },
        { id: '2', name: 'FashionHub', category: 'clothing', rating: 4.3, reviewCount: 189, logo: 'FH' },
        { id: '3', name: 'BookNook', category: 'books', rating: 4.8, reviewCount: 312, logo: 'BN' },
        { id: '4', name: 'Cafe Brew', category: 'food', rating: 4.5, reviewCount: 167, logo: 'CB' },
        { id: '5', name: 'HomeEssentials', category: 'home', rating: 4.2, reviewCount: 98, logo: 'HE' },
        { id: '6', name: 'GadgetZone', category: 'electronics', rating: 4.6, reviewCount: 203, logo: 'GZ' },
      ]);
      
      setTransactions([
        { id: 't1', merchantId: '1', merchantName: 'TechGadgets', amount: 12599, date: '2023-06-15', status: 'completed', type: 'payment' },
        { id: 't2', merchantId: '3', merchantName: 'BookNook', amount: 2499, date: '2023-06-18', status: 'completed', type: 'payment' },
        { id: 't3', merchantId: '4', merchantName: 'Cafe Brew', amount: 450, date: '2023-06-20', status: 'completed', type: 'payment' },
        { id: 't4', merchantId: '2', merchantName: 'FashionHub', amount: 7999, date: '2023-06-22', status: 'pending', type: 'payment' },
        { id: 't5', merchantId: '1', merchantName: 'TechGadgets', amount: 3500, date: '2023-06-10', status: 'completed', type: 'refund' },
      ]);
      
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter merchants based on search and category
  const filteredMerchants = merchants.filter(merchant => {
    const matchesSearch = merchant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || merchant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group transactions by merchant
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

  return (
    <div className="min-h-screen py-6 border-l border-gray-300">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">Explore Merchants</h1>
          <p className="text-gray-600">Discover new merchants and view your transaction history</p>
        </div>

        {/* Search Section */}
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
                        {merchant.logo}
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
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        View Details
                      </button>
                      
                      {transactionsByMerchant[merchant.id] && (
                        <div className="text-sm text-gray-600">
                          <FiDollarSign className="inline mr-1" />
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
    </div>
  );
};

export default ExplorePage;