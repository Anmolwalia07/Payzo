"use client"
import { FaChartLine, FaUsers, FaMoneyBillWave, FaExchangeAlt } from "react-icons/fa";
import { BsCreditCard } from "react-icons/bs";
import { FiActivity } from "react-icons/fi";

function AdminDashboard() {
  const stats = [
    { title: 'Total Users', value: '24,568', change: '+12.5%', icon: <FaUsers className="text-blue-500 text-2xl" /> },
    { title: 'Transactions', value: '8,742', change: '+8.3%', icon: <FaExchangeAlt className="text-green-500 text-2xl" /> },
    { title: 'Total Volume', value: '$1.24M', change: '+5.2%', icon: <FaMoneyBillWave className="text-purple-500 text-2xl" /> },
    { title: 'Active Accounts', value: '18,342', change: '+3.7%', icon: <BsCreditCard className="text-amber-500 text-2xl" /> },
  ];

  const recentTransactions = [
    { id: '#TX-7821', user: 'John Doe', type: 'Deposit', amount: '$450.00', status: 'Completed', date: '12 Oct, 2023' },
    { id: '#TX-7820', user: 'Sarah Smith', type: 'Transfer', amount: '$120.00', status: 'Pending', date: '12 Oct, 2023' },
    { id: '#TX-7819', user: 'Mike Johnson', type: 'Withdrawal', amount: '$300.00', status: 'Completed', date: '11 Oct, 2023' },
    { id: '#TX-7818', user: 'Emma Wilson', type: 'Payment', amount: '$89.99', status: 'Completed', date: '11 Oct, 2023' },
    { id: '#TX-7817', user: 'Alex Brown', type: 'Deposit', amount: '$250.00', status: 'Failed', date: '10 Oct, 2023' },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Scrollable main content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <p className="text-green-500 text-sm font-medium mt-1">{stat.change}</p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-lg">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-5">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-semibold text-gray-800">Revenue Overview</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-indigo-50 text-indigo-700 rounded-lg">Monthly</button>
                <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-lg">Quarterly</button>
                <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-lg">Yearly</button>
              </div>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-center">
                <FaChartLine className="text-indigo-400 text-4xl mx-auto mb-2" />
                <p className="text-gray-500">Revenue chart visualization</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-semibold text-gray-800">Recent Activity</h3>
              <button className="text-indigo-600 text-sm font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-full mr-3">
                    <FiActivity className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium">New transaction processed</p>
                    <p className="text-sm text-gray-500">User ID: #USR-00{item}</p>
                    <p className="text-xs text-gray-400 mt-1">10 minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-semibold text-gray-800">Recent Transactions</h3>
            <button className="text-indigo-600 text-sm font-medium">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTransactions.map((tx, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tx.id}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{tx.user}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{tx.type}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{tx.amount}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        tx.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
