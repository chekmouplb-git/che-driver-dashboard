'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DriverStats } from '@/types';

interface TrendChartProps {
  driver: DriverStats;
}

export default function TrendChart({ driver }: TrendChartProps) {
  const data = driver.recentRatings.map((r) => ({
    date: r.date,
    avg: parseFloat(r.avg.toFixed(2)),
  }));

  return (
    <ResponsiveContainer width="100%" height={140}>
      <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#D1FAE5" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 10, fill: '#94A3B8' }}
          tickFormatter={(v) => v.slice(5)}
        />
        <YAxis domain={[1, 5]} tick={{ fontSize: 10, fill: '#94A3B8' }} />
        <Tooltip
          formatter={(val) => [typeof val === 'number' ? val.toFixed(2) : val, 'Avg Rating']}
          contentStyle={{
            background: '#fff',
            border: '1px solid #D1FAE5',
            borderRadius: 8,
            fontSize: 12,
          }}
        />
        <Line
          type="monotone"
          dataKey="avg"
          stroke="#40916C"
          strokeWidth={2}
          dot={{ r: 4, fill: '#40916C', strokeWidth: 0 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
