import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const portfolioData = {
  value: 248750,
  income: 9420,
  yield: 4.8
};

const holdings = [
  { ticker: 'AAPL', shares: 120, avgPrice: 165, currentPrice: 212, yield: 0.45, income: 537.60 },
];

const pieData = [
  { name: 'AAPL', value: 35, fill: '#10b981' },
  { name: 'MSFT', value: 25, fill: '#3b82f6' },
  { name: 'GOOGL', value: 15, fill: '#8b5cf6' },
  { name: 'Others', value: 25, fill: '#ef4444' },
];

const upcomingDividends = [
  { date: '03 Ave PAM', time: '02:51 Hpm', amount: 86.00 },
  { date: '02 Ave PAM', time: '02:57 ltrm', amount: 29.00 },
  // more from screenshot
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold">D</div>
            <h1 className="text-2xl font-semibold tracking-tight">DiviHub</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Welcome back, Investor</span>
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="text-sm text-gray-500 mb-1">Portfolio Value</div>
            <div className="text-4xl font-semibold">${portfolioData.value.toLocaleString()}</div>
            <div className="text-green-500 text-sm mt-2 flex items-center gap-1">↑ 2.4%</div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="text-sm text-gray-500 mb-1">Est. Annual Income</div>
            <div className="text-4xl font-semibold">${portfolioData.income.toLocaleString()}</div>
            <div className="text-green-500 text-sm mt-2 flex items-center gap-1">↑ 1.8%</div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="text-sm text-gray-500 mb-1">Average Yield</div>
            <div className="text-4xl font-semibold">{portfolioData.yield}%</div>
            <div className="text-green-500 text-sm mt-2 flex items-center gap-1">↑ 0.3%</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Pie Chart */}
          <div className="lg:col-span-5 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border">
            <h2 className="text-xl font-semibold mb-6">Portfolio Allocation</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {pieData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.fill}}></div>
                  <span>{item.name} <span className="text-gray-500">{item.value}%</span></span>
                </div>
              ))}
            </div>
          </div>

          {/* Holdings */}
          <div className="lg:col-span-7 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">My Holdings</h2>
              <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-2xl text-sm font-medium transition">+ Add Holding</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-gray-500">
                    <th className="pb-3">Ticker</th>
                    <th className="pb-3">Shares</th>
                    <th className="pb-3">Avg Price</th>
                    <th className="pb-3">Current</th>
                    <th className="pb-3">Yield</th>
                    <th className="pb-3 text-right">Annual Income</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((h, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-4 font-medium">🍎 {h.ticker}</td>
                      <td className="py-4">{h.shares}</td>
                      <td className="py-4">${h.avgPrice}</td>
                      <td className="py-4">${h.currentPrice}</td>
                      <td className="py-4 text-green-500">{h.yield}%</td>
                      <td className="py-4 text-right font-medium text-green-600">${h.income}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Upcoming Dividends */}
        <div className="mt-8 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border">
          <h2 className="text-xl font-semibold mb-6">Upcoming Dividends</h2>
          <div className="space-y-4">
            {upcomingDividends.map((d, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                <div>
                  <div className="font-medium">{d.date}</div>
                  <div className="text-sm text-gray-500">{d.time}</div>
                </div>
                <div className="text-green-600 font-semibold">${d.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
