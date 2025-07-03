import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from 'recharts';

interface BalanceHistory {
  id: number;
  balance: number;
  userId?: number;
  createdAt: string;
  merchantId?: number;
}

export default function Chart({ data }: { data: BalanceHistory[] }) {
  const chartData = data.map((i) => ({
    ...i,
    createdAt: new Date(i.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    balance: Number(i.balance.toFixed(2))
  }));

  return (
    <div className="w-full h-64">
      {chartData.length > 1 ? (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="createdAt" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value) => [`₹${value}`, 'Balance']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Area 
              type="monotone" 
              dataKey="balance" 
              stroke="#4f46e5" 
              fillOpacity={1} 
              fill="url(#colorBalance)" 
              strokeWidth={2}
              activeDot={{ r: 6, fill: '#4f46e5' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-xl font-semibold">No History Available</h3>
          <p className="mt-2 text-gray-600">Start transacting to see your balance history</p>
        </div>
      )}
    </div>
  );
}