"use client"
import  { useState } from 'react';
import { FiSearch, FiFilter, FiUser, FiMail, FiCalendar, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import { FaCrown, FaUserCheck, FaUserTimes } from 'react-icons/fa';

// Mock data - replace with actual Prisma data fetching
const mockUsers = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'ADMIN',
    status: 'ACTIVE',
    createdAt: '2023-10-15T14:48:00.000Z',
    lastLogin: '2023-11-05T09:12:00.000Z',
    walletBalance: 2450.75
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'USER',
    status: 'ACTIVE',
    createdAt: '2023-09-22T11:30:00.000Z',
    lastLogin: '2023-11-04T16:45:00.000Z',
    walletBalance: 1200.50
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael@example.com',
    role: 'MERCHANT',
    status: 'ACTIVE',
    createdAt: '2023-10-05T08:15:00.000Z',
    lastLogin: '2023-11-03T14:20:00.000Z',
    walletBalance: 8700.25
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    role: 'USER',
    status: 'SUSPENDED',
    createdAt: '2023-08-17T16:20:00.000Z',
    lastLogin: '2023-10-28T11:05:00.000Z',
    walletBalance: 560.00
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david@example.com',
    role: 'USER',
    status: 'INACTIVE',
    createdAt: '2023-11-01T09:45:00.000Z',
    lastLogin: null,
    walletBalance: 0.00
  },
  {
    id: '6',
    name: 'Sophia Garcia',
    email: 'sophia@example.com',
    role: 'MERCHANT',
    status: 'ACTIVE',
    createdAt: '2023-09-10T13:25:00.000Z',
    lastLogin: '2023-11-05T08:30:00.000Z',
    walletBalance: 3420.80
  },
  {
    id: '7',
    name: 'James Wilson',
    email: 'james@example.com',
    role: 'USER',
    status: 'ACTIVE',
    createdAt: '2023-10-28T17:40:00.000Z',
    lastLogin: '2023-11-04T19:15:00.000Z',
    walletBalance: 780.25
  },
  {
    id: '8',
    name: 'Olivia Davis',
    email: 'olivia@example.com',
    role: 'ADMIN',
    status: 'ACTIVE',
    createdAt: '2023-08-05T10:15:00.000Z',
    lastLogin: '2023-11-05T07:50:00.000Z',
    walletBalance: 5320.00
  },
];

export default function AllUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  
  // Filter users based on search, role, and status
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'ALL' || user.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  
  // Format date
  const formatDate = (dateString:any) => {
    if (!dateString) return 'Never';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString();
  };
  
  // Format currency
  const formatCurrency = (amount:number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };


  return (
      <div className="h-full p-4 sm:p-6 overflow-y-scroll">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 ">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">User Management</h1>
          <button className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            <FiPlus className="mr-2" />
            Add New User
          </button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <h3 className="text-2xl font-bold mt-1">8,742</h3>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <FiUser className="text-indigo-600 text-xl" />
              </div>
            </div>
            <p className="text-green-500 text-sm font-medium mt-2">+12.5% from last month</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Users</p>
                <h3 className="text-2xl font-bold mt-1">6,328</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FaUserCheck className="text-green-600 text-xl" />
              </div>
            </div>
            <p className="text-green-500 text-sm font-medium mt-2">+8.3% from last month</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 text-sm">Suspended Users</p>
                <h3 className="text-2xl font-bold mt-1">142</h3>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FaUserTimes className="text-yellow-600 text-xl" />
              </div>
            </div>
            <p className="text-red-500 text-sm font-medium mt-2">-2.1% from last month</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 text-sm">New Users (30d)</p>
                <h3 className="text-2xl font-bold mt-1">1,245</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiCalendar className="text-blue-600 text-xl" />
              </div>
            </div>
            <p className="text-green-500 text-sm font-medium mt-2">+5.7% from last month</p>
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
                placeholder="Search users by name or email..."
                className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              
              <div className="relative">
                <select
                  className="pl-10 pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent appearance-none"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="ALL">All Statuses</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="SUSPENDED">Suspended</option>
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
            </div>
          </div>
        </div>
        
        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wallet Balance</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th> */}
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <FiUser className="text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {user.role === 'ADMIN' && <FaCrown className="text-yellow-500 mr-1" />}
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.role === 'ADMIN' ? 'bg-yellow-100 text-yellow-800' : 
                          user.role === 'MERCHANT' ? 'bg-purple-100 text-purple-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                        user.status === 'SUSPENDED' ? 'bg-red-100 text-red-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {formatCurrency(user.walletBalance)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.createdAt.toString())}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <FiEdit className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(indexOfLastUser, filteredUsers.length)}</span> of{' '}
                  <span className="font-medium">{filteredUsers.length}</span> results
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
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
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
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}