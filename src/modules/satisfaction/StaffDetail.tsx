'use client';

import { StaffStats, SATISFACTION_METRIC_LABELS, ALL_SATISFACTION_METRICS, SatisfactionMetricKey } from '@/types';
import SatisfactionRadarChart from './SatisfactionRadarChart';
import SatisfactionTrendChart from './SatisfactionTrendChart';
import MetricBar from '@/components/MetricBar';
import StarRating from '@/components/StarRating';
import { getRatingLabel } from './data';
import { MessageSquare, TrendingUp, Briefcase, Smartphone } from 'lucide-react';

const METRIC_ICONS: Record<SatisfactionMetricKey, string> = {
  avgResponsiveness:   '📡',
  avgReliability:      '🛡️',
  avgAccessFacilities: '🏢',
  avgCommunication:    '💬',
  avgCosts:            '💰',
  avgIntegrity:        '⚖️',
  avgAssurance:        '✅',
  avgOutcome:          '🎯',
};

export default function StaffDetail({ staff, allStaff }: { staff: StaffStats; allStaff: StaffStats[] }) {
  const { label, color, bg } = getRatingLabel(staff.avgOverall);

  const weakest = ALL_SATISFACTION_METRICS.reduce((a, b) =>
    (staff[a] || 99) < (staff[b] || 99) ? a : b
  );

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)',
        borderRadius: 16, padding: '24px 24px 20px', marginBottom: 20, color: '#fff',
      }}>
        <div className="flex items-start justify-between">
          <div>
            <div style={{ fontSize: 11, opacity: 0.75, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
              Staff Performance
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>{staff.name}</h2>
            <div className="flex items-center gap-3 mt-2">
              <StarRating value={staff.avgOverall} size="lg" />
              <span style={{ fontSize: 20, fontWeight: 800 }}>{staff.avgOverall.toFixed(2)}</span>
              <span style={{ opacity: 0.65, fontSize: 13 }}>/ 5.00</span>
            </div>
          </div>
          <span style={{ background: bg, color, borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 700 }}>
            {label}
          </span>
        </div>
        <div className="flex gap-4 mt-4" style={{ flexWrap: 'wrap' }}>
          <div style={{ opacity: 0.85, fontSize: 13 }}>
            <span style={{ fontWeight: 700, fontSize: 18, color: '#fff' }}>{staff.totalResponses}</span> responses
          </div>
          {staff.modes.length > 0 && (
            <div style={{ opacity: 0.85, fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Smartphone size={13} />
              {staff.modes.join(', ')}
            </div>
          )}
        </div>
      </div>

      {/* Radar + Trend */}
      <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ background: '#fff', borderRadius: 14, padding: '16px 12px', border: '1px solid #E2E8F0' }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#64748B', margin: '0 0 8px 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Performance Radar
          </p>
          <SatisfactionRadarChart staff={staff} />
        </div>
        <div style={{ background: '#fff', borderRadius: 14, padding: '16px 12px', border: '1px solid #E2E8F0' }}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={13} color="#7C3AED" />
            <p style={{ fontSize: 12, fontWeight: 600, color: '#64748B', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Rating Trend
            </p>
          </div>
          <SatisfactionTrendChart staff={staff} />
          {staff.recentRatings.length < 2 && (
            <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 8, textAlign: 'center' }}>
              More responses needed for trend data
            </p>
          )}
        </div>
      </div>

      {/* Metric Bars */}
      <div style={{ background: '#fff', borderRadius: 14, padding: '16px 20px', border: '1px solid #E2E8F0', marginBottom: 16 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: '#64748B', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Metric Breakdown
        </p>
        {ALL_SATISFACTION_METRICS.map((key) => (
          <MetricBar
            key={key}
            label={SATISFACTION_METRIC_LABELS[key]}
            value={staff[key]}
            icon={METRIC_ICONS[key]}
          />
        ))}
        {staff[weakest] > 0 && staff[weakest] < 4 && (
          <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 8, padding: '8px 12px', marginTop: 12, fontSize: 12, color: '#9A3412' }}>
            💡 Lowest metric: <strong>{SATISFACTION_METRIC_LABELS[weakest]}</strong> ({staff[weakest].toFixed(2)}) — may need attention
          </div>
        )}
      </div>

      {/* Services availed */}
      {staff.services.length > 0 && (
        <div style={{ background: '#fff', borderRadius: 14, padding: '14px 20px', border: '1px solid #E2E8F0', marginBottom: 16 }}>
          <div className="flex items-center gap-2 mb-2">
            <Briefcase size={13} color="#7C3AED" />
            <p style={{ fontSize: 12, fontWeight: 600, color: '#64748B', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Services Handled
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {staff.services.map((s) => (
              <span key={s} style={{ background: '#FAF5FF', color: '#4C1D95', borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 500, border: '1px solid #E9D5FF' }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Comments */}
      {staff.comments.length > 0 && (
        <div style={{ background: '#fff', borderRadius: 14, padding: '16px 20px', border: '1px solid #E2E8F0' }}>
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare size={13} color="#7C3AED" />
            <p style={{ fontSize: 12, fontWeight: 600, color: '#64748B', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Client Comments & Suggestions
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {staff.comments.map((c, i) => (
              <div key={i} style={{ background: '#FAF5FF', borderLeft: '3px solid #7C3AED', borderRadius: '0 8px 8px 0', padding: '8px 12px', fontSize: 13, color: '#374151', fontStyle: 'italic', lineHeight: 1.5 }}>
                "{c}"
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
