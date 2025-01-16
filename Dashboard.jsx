import React, { useState } from 'react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  // State for theme toggle
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // State for sales data
  const [salesData] = useState([
    { month: 'January', sales: 65000 },
    { month: 'February', sales: 59000 },
    { month: 'March', sales: 80000 },
    { month: 'April', sales: 81000 },
    { month: 'May', sales: 56000 },
    { month: 'June', sales: 55000 },
    { month: 'July', sales: 40000 }
  ]);

  // State for category data
  const [categoryData] = useState([
    { name: 'Category A', value: 300000 },
    { name: 'Category B', value: 50000 },
    { name: 'Category C', value: 100000 }
  ]);

  // State for table data with sorting functionality
  const [tableData, setTableData] = useState([
    { id: 1, name: 'Product A', sales: 1000, revenue: 10000 },
    { id: 2, name: 'Product B', sales: 2000, revenue: 20000 },
    { id: 3, name: 'Product C', sales: 3000, revenue: 30000 },
    { id: 4, name: 'Product D', sales: 4000, revenue: 40000 },
    { id: 5, name: 'Product E', sales: 5000, revenue: 50000 }
  ]);
  
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Calculate KPI metrics
  const totalSales = tableData.reduce((sum, item) => sum + item.revenue, 0);
  const averageRevenue = totalSales / tableData.length;
  const userEngagement = 75; // Example static value
  const newUsers = 1234; // Example static value

  // Sorting function for table
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedData = [...tableData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setTableData(sortedData);
  };

  // Colors for pie chart
  const COLORS = ['#FF8042', '#00C49F', '#FFBB28'];

  const handleDownloadReport = () => {
    const report = {
      totalSales,
      averageRevenue,
      userEngagement,
      newUsers,
      salesData,
      categoryData,
      tableData
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard-report.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md"
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
        <nav className="mt-6">
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 dark:hover:bg-gray-700">
            📊 Overview
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 dark:hover:bg-gray-700">
            💰 Sales
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 dark:hover:bg-gray-700">
            👥 Users
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 dark:hover:bg-gray-700">
            ⚙️ Settings
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">Overview</h2>
          <button
            onClick={handleDownloadReport}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
          >
            Download Report
          </button>
        </div>

        {/* KPI Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Total Sales</h3>
            <p className="text-2xl font-bold">R{totalSales.toLocaleString()}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Average Revenue</h3>
            <p className="text-2xl font-bold">R{averageRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">User Engagement</h3>
            <p className="text-2xl font-bold">{userEngagement}%</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">New Users</h3>
            <p className="text-2xl font-bold">{newUsers.toLocaleString()}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Sales Over Time</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#4B9CD3"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Sales by Category</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4">Detailed Data</h3>
          <table className="min-w-full">
            <thead>
              <tr>
                {['id', 'name', 'sales', 'revenue'].map((key) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    className="py-2 px-4 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    {sortConfig.key === key && (
                      <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`
                    ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}
                    hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-150
                  `}
                >
                  <td className="py-2 px-4 border-b">{item.id}</td>
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">R{item.sales.toLocaleString()}</td>
                  <td className="py-2 px-4 border-b">R{item.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
