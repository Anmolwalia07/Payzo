import { DateTime } from 'next-auth/providers/kakao';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

type balanceHistory = {
  id: number;
  balance: number;
  userId: number;
  createdAt: DateTime;
};

export default function Chart({ data }: { data: balanceHistory[] }) {
  const data1 = data.map((i) => ({
    ...i,
    createdAt: new Date(i.createdAt).toISOString().split('T')[0]
  }));

  return (
    <>
      {data1.length > 1 ? (
        <div style={{ width: '100%', height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data1} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
              <XAxis dataKey="createdAt" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line dataKey="balance" stroke="#000" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center text-2xl font-semibold h-full pb-20 tracking-wide">
          No History...
        </div>
      )}
    </>
  );
}
