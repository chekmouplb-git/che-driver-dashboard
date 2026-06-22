'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { DriverStats, METRIC_LABELS, ALL_METRICS } from '@/types';

interface DriverRadarChartProps {
  driver: DriverStats;
  compareDriver?: DriverStats | null;
}

export default function DriverRadarChart({ driver, compareDriver }: DriverRadarChartProps) {
  const data = ALL_METRICS.map((key) => ({
    metric: METRIC_LABELS[key],
    value: parseFloat(driver[key].toFixed(2)),
    compare: compareDriver ? parseFloat(compareDriver[key].toFixed(2)) : undefined,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
        <PolarGrid stroke="#D1FAE5" />
        <PolarAngleAxis
          dataKey="metric"
          tick={{ fontSize: 11, fill: '#64748B', fontWeight: 500 }}
        />
        <Tooltip
          formatter={(val) => typeof val === 'number' ? val.toFixed(2) : val}
          contentStyle={{
            background: '#fff',
            border: '1px solid #D1FAE5',
            borderRadius: 8,
            fontSize: 12,
          }}
        />
        <Radar
          name={driver.name}
          dataKey="value"
          stroke="#40916C"
          fill="#40916C"
          fillOpacity={0.25}
          strokeWidth={2}
          dot={{ r: 3, fill: '#40916C' }}
        />
        {compareDriver && (
          <Radar
            name={compareDriver.name}
            dataKey="compare"
            stroke="#F59E0B"
            fill="#F59E0B"
            fillOpacity={0.15}
            strokeWidth={2}
            dot={{ r: 3, fill: '#F59E0B' }}
          />
        )}
      </RadarChart>
    </ResponsiveContainer>
  );
}
