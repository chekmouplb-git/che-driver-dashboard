'use client';

import { StaffStats } from '@/types';
import { getRatingLabel } from './data';
import StarRating from '@/components/StarRating';

interface StaffCardProps {
  staff: StaffStats;
  rank: number;
  selected: boolean;
  onClick: () => void;
}

const RANK_MEDALS = ['🥇', '🥈', '🥉'];

export default function StaffCard({ staff, rank, selected, onClick }: StaffCardProps) {
  const { label, color, bg } = getRatingLabel(staff.avgOverall);

  return (
    <button onClick={onClick} className="w-full text-left" style={{ outline: 'none' }}>
      <div style={{
        background: selected ? '#FAF5FF' : '#FFFFFF',
        border: `2px solid ${selected ? '#7C3AED' : '#E2E8F0'}`,
        borderRadius: 14,
        padding: '14px 16px',
        transition: 'all 0.2s',
        cursor: 'pointer',
        boxShadow: selected ? '0 4px 16px rgba(124,58,237,0.12)' : '0 1px 4px rgba(0,0,0,0.05)',
      }}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span style={{ fontSize: 16 }}>{RANK_MEDALS[rank] ?? `#${rank + 1}`}</span>
            <span style={{ fontWeight: 700, fontSize: 14, color: '#1E293B' }}>{staff.name}</span>
          </div>
          <span style={{ background: bg, color, borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>
            {label}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <StarRating value={staff.avgOverall} size="sm" />
          <span style={{ color: '#64748B', fontSize: 12 }}>
            {staff.avgOverall.toFixed(2)} · {staff.totalResponses} response{staff.totalResponses !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </button>
  );
}
