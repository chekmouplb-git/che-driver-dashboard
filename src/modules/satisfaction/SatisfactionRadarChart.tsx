'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { StaffStats, SATISFACTION_METRIC_LABELS, ALL_SATISFACTION_METRICS } from '@/types';

interface SatisfactionRadarChartProps {
  staff: StaffStats;
}

export default function SatisfactionRadarChart({ staff }: SatisfactionRadarChartProps) {
  const data = ALL_SATISFACTION_METRICS.map((key) => ({
    metric: SATISFACTION_METRIC_LABELS[key],
    value: parseFloat(staff[key].toFixed(2)),
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
        <PolarGrid stroke="#E9D5FF" />
        <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: '#64748B', fontWeight: 500 }} />
        <Tooltip
          formatter={(val) => typeof val === 'number' ? val.toFixed(2) : val}
          contentStyle={{ background: '#fff', border: '1px solid #E9D5FF', borderRadius: 8, fontSize: 12 }}
        />
        <Radar
          name={staff.name}
          dataKey="value"
          stroke="#7C3AED"
          fill="#7C3AED"
          fillOpacity={0.2}
          strokeWidth={2}
          dot={{ r: 3, fill: '#7C3AED' }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
