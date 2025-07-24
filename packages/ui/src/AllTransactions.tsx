"use client"
import { useState } from 'react';
import { 
  FiSearch, FiFilter, FiCreditCard, FiArrowDown, FiArrowUp, 
  FiDownload, FiRefreshCw, FiUser, FiShoppingBag, FiDollarSign,
  FiCheckCircle, FiXCircle, FiClock, FiPlus
} from 'react-icons/fi';



export default function AllTransactions({mockTransactions,text}:{mockTransactions:any[],text:string}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  
  // Filter transactions
  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (transaction.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (transaction.merchant?.name?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === 'ALL' || transaction.type === selectedType;
    
    let statusMatch = true;
    if (selectedStatus !== 'ALL') {
      if (selectedStatus === 'COMPLETED') {
        statusMatch = transaction.status === 'completed' || transaction.status === 'Success';
      } else if (selectedStatus === 'PENDING') {
        statusMatch = transaction.status === 'pending' || transaction.status === 'Processing';
      } else if (selectedStatus === 'FAILED') {
        statusMatch = transaction.status === 'failed' || transaction.status === 'Failure';
      }
    }
    return matchesSearch && matchesType && statusMatch;
  });

  console.log(filteredTransactions)
  
  // Pagination
  const indexOfLastTransaction = currentPage * usersPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - usersPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(filteredTransactions.length / usersPerPage);
  
  // Format date
  const formatDate = (dateString:any) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  // Format currency
  const formatCurrency = (amount:number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits:0
    }).format(amount);
  };
  
  // Get transaction type label
  const getTypeLabel = (type:any) => {
    switch(type) {
      case 'payment': return 'Payment';
      case 'on_ramp': return 'Deposit';
      case 'off_ramp_user': return 'User Withdrawal';
      case 'off_ramp_merchant': return 'Merchant Withdrawal';
      case 'refund': return 'Refund';
      default: return type;
    }
  };
  
  // Get status icon and color
  const getStatusProps = (status:any) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'completed' || statusLower === 'success') {
      return { icon: <FiCheckCircle className="text-green-500" />, color: 'bg-green-100 text-green-800' };
    } else if (statusLower === 'pending' || statusLower === 'processing') {
      return { icon: <FiClock className="text-yellow-500" />, color: 'bg-yellow-100 text-yellow-800' };
    } else {
      return { icon: <FiXCircle className="text-red-500" />, color: 'bg-red-100 text-red-800' };
    }
  };

  return (
      <div className="p-4 max-h-full sm:p-6 overflow-y-scroll bg-white outline-none">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">{text}</h1>
            <p className="text-gray-600 mt-1">View and manage all transactions in your system</p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <button className="flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <FiDownload className="mr-2" />
              Export CSV
            </button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Transactions</p>
                <h3 className="text-2xl font-bold mt-1">{mockTransactions.length}</h3>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg h-fit">
                <FiCreditCard className="text-indigo-600 text-xl " />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 text-sm">Completed</p>
                <h3 className="text-2xl font-bold mt-1">{mockTransactions.filter(i=>i.status==="completed" ||i.status==="Success").length}</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-lg h-fit">
                <FiCheckCircle className="text-green-600 text-xl " />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending</p>
                <h3 className="text-2xl font-bold mt-1">{mockTransactions.filter(i=>i.status==="pending" || i.status==="Processing").length}</h3>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg h-fit">
                <FiClock className="text-yellow-600 text-xl " />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 text-sm">Failed</p>
                <h3 className="text-2xl font-bold mt-1">{mockTransactions.filter(i=>i.status==="Failure" || i.status==="Failed").length}</h3>
              </div>
              <div className="bg-red-100 p-3 rounded-lg h-fit">
                <FiXCircle className="text-red-600 text-xl " />
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
                placeholder={`Search transactions by user${text==="All Transactions" ? " or merchant...":"..."}`}
                className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
             <div className="flex flex-col sm:flex-row gap-3">
             {text ==="All Transactions" && <div className="relative">
                <select
                  className="pl-10 pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent appearance-none"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="ALL">All Types</option>
                  <option value="payment">Payments</option>
                  <option value="on_ramp">Deposits</option>
                  <option value="off_ramp_user">User Withdrawals</option>
                  <option value="off_ramp_merchant">Merchant Withdrawals</option>
                  <option value="refund">Refunds</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiFilter className="text-gray-400" />
                </div>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FiArrowDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>}
              
              <div className="relative">
                <select
                  className="pl-10 pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent appearance-none"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="ALL">All Statuses</option>
                  <option value="COMPLETED">Completed/Success</option>
                  <option value="PENDING">Pending/Processing</option>
                  <option value="FAILED">Failed</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiFilter className="text-gray-400" />
                </div>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FiArrowDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <button onClick={()=>{
                setSelectedStatus("ALL");
                setSelectedType("ALL");
                setSearchTerm("")
              }} className="flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                <FiRefreshCw className="mr-2" />
                Reset
              </button>
            </div>
            
          </div>
        </div>
        
        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  {text!=="Deposits" &&<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Merchant</th>}
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentTransactions.map((transaction) => {
                  const statusProps = getStatusProps(transaction.status);
                  return (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className={`px-2 py-1 rounded-full ${
                        transaction.type === 'payment' ? 'bg-blue-100 text-blue-800' : 
                        transaction.type === 'on_ramp' ? 'bg-green-100 text-green-800' : 
                        transaction.type === 'off_ramp_user' ? 'bg-purple-100 text-purple-800' : 
                        transaction.type === 'off_ramp_merchant' ? 'bg-amber-100 text-amber-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {getTypeLabel(transaction.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {transaction.user ? (
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                            <FiUser className="text-indigo-600" />
                          </div>
                          <div className="ml-2">
                            <div className="font-medium text-gray-900">{transaction.user.name}</div>
                            <div className="text-xs text-gray-500">ID: {transaction.user.id}</div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400 font-bold flex justify-center">--</span>
                      )}
                    </td>
                     {text!=="Deposits" && <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {transaction.merchant ? (
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center">
                            <FiShoppingBag className="text-amber-600" />
                          </div>
                          <div className="ml-2">
                            <div className="font-medium text-gray-900">{transaction.merchant.name}</div>
                            <div className="text-xs text-gray-500">ID: {transaction.merchant.id}</div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400 font-bold flex justify-center">--</span>
                      )}
                    </td>}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="flex items-center">
                        {formatCurrency(transaction.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        {statusProps.icon}
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${statusProps.color}`}>
                          {transaction.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.provider || '--'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                        View
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Refund
                      </button>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstTransaction + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(indexOfLastTransaction, filteredTransactions.length)}</span> of{' '}
                  <span className="font-medium">{filteredTransactions.length}</span> transactions
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <FiArrowUp className="h-5 w-5" />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === page
                          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <FiArrowDown className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}