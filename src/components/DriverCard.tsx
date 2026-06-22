'use client';

import { DriverStats } from '@/types';
import StarRating from './StarRating';

interface DriverCardProps {
  driver: DriverStats;
  rank: number;
  selected: boolean;
  onClick: () => void;
}

function getRatingColor(avg: number) {
  if (avg >= 4.5) return '#22C55E';
  if (avg >= 3.5) return '#40916C';
  if (avg >= 2.5) return '#F59E0B';
  return '#EF4444';
}

function getRatingLabel(avg: number) {
  if (avg >= 4.5) return 'Excellent';
  if (avg >= 3.5) return 'Good';
  if (avg >= 2.5) return 'Fair';
  return 'Needs Attention';
}

const RANK_MEDALS = ['🥇', '🥈', '🥉'];

export default function DriverCard({ driver, rank, selected, onClick }: DriverCardProps) {
  const color = getRatingColor(driver.avgOverall);
  const label = getRatingLabel(driver.avgOverall);

  return (
    <button
      onClick={onClick}
      className="w-full text-left transition-all duration-200"
      style={{ outline: 'none' }}
    >
      <div
        style={{
          background: selected ? '#F0FDF4' : '#FFFFFF',
          border: `2px solid ${selected ? '#40916C' : '#E2E8F0'}`,
          borderRadius: 14,
          padding: '16px 18px',
          transition: 'all 0.2s',
          cursor: 'pointer',
          boxShadow: selected
            ? '0 4px 16px rgba(64,145,108,0.15)'
            : '0 1px 4px rgba(0,0,0,0.05)',
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span style={{ fontSize: 18 }}>{RANK_MEDALS[rank] ?? `#${rank + 1}`}</span>
            <span style={{ fontWeight: 700, fontSize: 15, color: '#1E293B' }}>
              {driver.name}
            </span>
          </div>
          <span
            style={{
              background: color + '20',
              color,
              borderRadius: 20,
              padding: '2px 10px',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.03em',
            }}
          >
            {label}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <StarRating value={driver.avgOverall} size="md" />
          <span style={{ color: '#64748B', fontSize: 13 }}>
            {driver.avgOverall.toFixed(2)} · {driver.totalTrips} trip
            {driver.totalTrips !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex gap-2 mt-3 flex-wrap">
          {driver.cars.map((car) => (
            <span
              key={car}
              style={{
                background: '#F1F5F9',
                color: '#475569',
                borderRadius: 6,
                padding: '2px 8px',
                fontSize: 11,
              }}
            >
              🚗 {car.split('(')[0].trim()}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
