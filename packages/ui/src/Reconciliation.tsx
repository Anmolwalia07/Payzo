"use client"
import { useState } from 'react';
import { 
  FiFilter, FiRefreshCw, FiCheckCircle, FiAlertCircle, 
  FiClock, FiDollarSign, FiDownload, FiSearch, FiBarChart2
} from 'react-icons/fi';
import { FaBalanceScale } from 'react-icons/fa';

export interface ReconciliationItem {
  id: string;
  transactionId: string;
  amount: number;
  date: string;
  source: string;
  status: 'matched' | 'unmatched' | 'pending';
  variance: number;
  internalRef: string;
  externalRef: string;
}

interface ReconciliationSummary {
  totalTransactions: number;
  matched: number;
  unmatched: number;
  pending: number;
  totalVariance: number;
}

interface ReconciliationProps {
  reconciliationItems: ReconciliationItem[];
  summary: ReconciliationSummary;
}

export default function Reconciliation({ 
  reconciliationItems, 
  summary 
}: ReconciliationProps) {
  const [statusFilter, setStatusFilter] = useState('all');
//   const [dateRange, setDateRange] = useState('last30');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter data based on selections
  const filteredData = reconciliationItems.filter(item => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesSearch = 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.source.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };
  
  // Get status properties
  const getStatusProps = (status: 'matched' | 'unmatched' | 'pending') => {
    switch(status) {
      case 'matched':
        return { 
          icon: <FiCheckCircle className="text-green-500" />, 
          color: 'bg-green-100 text-green-800', 
          text: 'Matched' 
        };
      case 'unmatched':
        return { 
          icon: <FiAlertCircle className="text-red-500" />, 
          color: 'bg-red-100 text-red-800', 
          text: 'Unmatched' 
        };
      case 'pending':
        return { 
          icon: <FiClock className="text-yellow-500" />, 
          color: 'bg-yellow-100 text-yellow-800', 
          text: 'Pending' 
        };
      default:
        return { 
          icon: <FiClock />, 
          color: 'bg-gray-100 text-gray-800', 
          text: status 
        };
    }
  };

  return (
    <div className="p-4 sm:p-6 h-full overflow-y-scroll">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reconciliation</h1>
          <p className="text-gray-600 mt-1">Review and reconcile financial transactions</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button className="flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
            <FiRefreshCw className="mr-2" />
            Refresh
          </button>
          <button className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            <FiDownload className="mr-2" />
            Export Report
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Transactions</p>
              <h3 className="text-2xl font-bold mt-1">{summary.totalTransactions}</h3>
            </div>
            <div className="bg-indigo-100 p-3 rounded-lg">
              <FiBarChart2 className="text-indigo-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Matched</p>
              <h3 className="text-2xl font-bold mt-1">{summary.matched}</h3>
              <p className="text-green-500 text-sm font-medium mt-1">{Math.round((summary.matched / summary.totalTransactions) * 100)}% match rate</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <FiCheckCircle className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Unmatched</p>
              <h3 className="text-2xl font-bold mt-1">{summary.unmatched}</h3>
              <p className="text-red-500 text-sm font-medium mt-1">{Math.round((summary.unmatched / summary.totalTransactions) * 100)}% variance</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <FiAlertCircle className="text-red-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Variance</p>
              <h3 className="text-2xl font-bold mt-1">{formatCurrency(summary.totalVariance)}</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <FiDollarSign className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by ID, transaction, or source..."
              className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <select
                className="pl-10 pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent appearance-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="matched">Matched</option>
                <option value="unmatched">Unmatched</option>
                <option value="pending">Pending</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="text-gray-400" />
              </div>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            
            {/* <div className="relative">
              <select
                className="pl-10 pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent appearance-none"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="last7">Last 7 days</option>
                <option value="last30">Last 30 days</option>
                <option value="last90">Last 90 days</option>
                <option value="custom">Custom Range</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="text-gray-400" />
              </div>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      
      {/* Reconciliation Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rec ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variance</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">References</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item) => {
                const statusProps = getStatusProps(item.status);
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.transactionId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(item.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.source}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(item.amount)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      item.variance > 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {item.variance > 0 ? `+${formatCurrency(item.variance)}` : formatCurrency(item.variance)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {statusProps.icon}
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${statusProps.color}`}>
                          {statusProps.text}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col">
                        <span className="font-medium">Internal: {item.internalRef}</span>
                        <span>External: {item.externalRef}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {item.status === 'unmatched' ? (
                        <button className="text-indigo-600 hover:text-indigo-900 px-3 py-1 bg-indigo-50 rounded-md">
                          Resolve
                        </button>
                      ) : (
                        <button className="text-gray-600 hover:text-gray-900 px-3 py-1 bg-gray-100 rounded-md">
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        
        {/* Empty state */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <FaBalanceScale className="text-gray-400 text-4xl" />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No reconciliation items found</h3>
            <p className="mt-1 text-sm text-gray-500 max-w-prose mx-auto">
              Adjust your filters or try a different search term. All transactions are currently reconciled.
            </p>
          </div>
        )}
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredData.length}</span> of{' '}
                <span className="font-medium">{filteredData.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  disabled
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-300"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border text-sm font-medium bg-indigo-50 border-indigo-500 text-indigo-600">
                  1
                </button>
                <button
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reconciliation Summary */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Reconciliation Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-blue-800">Matched Transactions</h3>
            <p className="text-3xl font-bold mt-2">{summary.matched} <span className="text-sm text-green-600">({Math.round((summary.matched / summary.totalTransactions) * 100)}%)</span></p>
            <div className="mt-4 h-2 bg-blue-200 rounded-full">
              <div 
                className="h-2 bg-blue-600 rounded-full" 
                style={{ width: `${(summary.matched / summary.totalTransactions) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-red-50 rounded-lg p-4">
            <h3 className="font-medium text-red-800">Unmatched Transactions</h3>
            <p className="text-3xl font-bold mt-2">{summary.unmatched} <span className="text-sm text-red-600">({Math.round((summary.unmatched / summary.totalTransactions) * 100)}%)</span></p>
            <div className="mt-4 h-2 bg-red-200 rounded-full">
              <div 
                className="h-2 bg-red-600 rounded-full" 
                style={{ width: `${(summary.unmatched / summary.totalTransactions) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="font-medium text-yellow-800">Pending Reconciliation</h3>
            <p className="text-3xl font-bold mt-2">{summary.pending} <span className="text-sm text-yellow-600">({Math.round((summary.pending / summary.totalTransactions) * 100)}%)</span></p>
            <div className="mt-4 h-2 bg-yellow-200 rounded-full">
              <div 
                className="h-2 bg-yellow-500 rounded-full" 
                style={{ width: `${(summary.pending / summary.totalTransactions) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800">Total Variance</h3>
          <p className="text-3xl font-bold mt-2 text-red-600">+{formatCurrency(summary.totalVariance)}</p>
          <p className="text-sm text-gray-600 mt-2">This amount represents the total discrepancy between internal records and external sources</p>
        </div>
      </div>
    </div>
  );
}