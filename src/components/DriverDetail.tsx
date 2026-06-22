'use client';

import { DriverStats, METRIC_LABELS, ALL_METRICS, MetricKey } from '@/types';
import DriverRadarChart from './DriverRadarChart';
import TrendChart from './TrendChart';
import MetricBar from './MetricBar';
import StarRating from './StarRating';
import { MessageSquare, TrendingUp, Car, MapPin } from 'lucide-react';

interface DriverDetailProps {
  driver: DriverStats;
  allDrivers: DriverStats[];
}

const METRIC_ICONS: Record<MetricKey, string> = {
  avgResponsiveness: '📡',
  avgReliability: '🛡️',
  avgPunctuality: '⏱️',
  avgRoadDiscipline: '🚦',
  avgKnowledgeOfRoutes: '🗺️',
  avgVehicleCleanliness: '✨',
  avgDrivingComfort: '🪑',
};

function getRatingBadge(avg: number) {
  if (avg >= 4.5) return { label: 'Excellent', bg: '#DCFCE7', color: '#15803D' };
  if (avg >= 3.5) return { label: 'Good', bg: '#D1FAE5', color: '#065F46' };
  if (avg >= 2.5) return { label: 'Fair', bg: '#FEF9C3', color: '#854D0E' };
  return { label: 'Needs Attention', bg: '#FEE2E2', color: '#991B1B' };
}

export default function DriverDetail({ driver, allDrivers }: DriverDetailProps) {
  const badge = getRatingBadge(driver.avgOverall);
  const otherDrivers = allDrivers.filter((d) => d.name !== driver.name);

  // Find weakest metric
  const weakest = ALL_METRICS.reduce((a, b) =>
    driver[a] < driver[b] ? a : b
  );

  return (
    <div className="fade-in">
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1B4332 0%, #40916C 100%)',
          borderRadius: 16,
          padding: '24px 24px 20px',
          marginBottom: 20,
          color: '#fff',
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div style={{ fontSize: 11, opacity: 0.75, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
              Driver Performance
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>{driver.name}</h2>
            <div className="flex items-center gap-3 mt-2">
              <StarRating value={driver.avgOverall} size="lg" />
              <span style={{ fontSize: 20, fontWeight: 800 }}>{driver.avgOverall.toFixed(2)}</span>
              <span style={{ opacity: 0.65, fontSize: 13 }}>/ 5.00</span>
            </div>
          </div>
          <span
            style={{
              background: badge.bg,
              color: badge.color,
              borderRadius: 20,
              padding: '6px 14px',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {badge.label}
          </span>
        </div>

        <div className="flex gap-4 mt-4">
          <div style={{ opacity: 0.85, fontSize: 13 }}>
            <span style={{ fontWeight: 700, fontSize: 18, color: '#fff' }}>{driver.totalTrips}</span>{' '}
            trips
          </div>
          <div style={{ opacity: 0.85, fontSize: 13 }}>
            <Car size={14} style={{ display: 'inline', marginRight: 4 }} />
            {driver.cars.join(', ')}
          </div>
        </div>
      </div>

      {/* Radar + Trend */}
      <div
        className="grid gap-4 mb-4"
        style={{ gridTemplateColumns: '1fr 1fr' }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: 14,
            padding: '16px 12px',
            border: '1px solid #E2E8F0',
          }}
        >
          <p style={{ fontSize: 12, fontWeight: 600, color: '#64748B', margin: '0 0 8px 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Performance Radar
          </p>
          <DriverRadarChart driver={driver} />
        </div>

        <div
          style={{
            background: '#fff',
            borderRadius: 14,
            padding: '16px 12px',
            border: '1px solid #E2E8F0',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={13} color="#40916C" />
            <p style={{ fontSize: 12, fontWeight: 600, color: '#64748B', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Rating Trend
            </p>
          </div>
          <TrendChart driver={driver} />
          {driver.recentRatings.length < 2 && (
            <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 8, textAlign: 'center' }}>
              More trips needed for trend data
            </p>
          )}
        </div>
      </div>

      {/* Metric Bars */}
      <div
        style={{
          background: '#fff',
          borderRadius: 14,
          padding: '16px 20px',
          border: '1px solid #E2E8F0',
          marginBottom: 16,
        }}
      >
        <p style={{ fontSize: 12, fontWeight: 600, color: '#64748B', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Metric Breakdown
        </p>
        {ALL_METRICS.map((key) => (
          <MetricBar
            key={key}
            label={METRIC_LABELS[key]}
            value={driver[key]}
            icon={METRIC_ICONS[key]}
          />
        ))}

        {driver[weakest] < 4 && (
          <div
            style={{
              background: '#FFF7ED',
              border: '1px solid #FED7AA',
              borderRadius: 8,
              padding: '8px 12px',
              marginTop: 12,
              fontSize: 12,
              color: '#9A3412',
            }}
          >
            💡 Lowest metric: <strong>{METRIC_LABELS[weakest]}</strong> ({driver[weakest].toFixed(2)}) — may need improvement
          </div>
        )}
      </div>

      {/* Destinations */}
      {driver.destinations.length > 0 && (
        <div
          style={{
            background: '#fff',
            borderRadius: 14,
            padding: '14px 20px',
            border: '1px solid #E2E8F0',
            marginBottom: 16,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={13} color="#40916C" />
            <p style={{ fontSize: 12, fontWeight: 600, color: '#64748B', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Destinations Covered
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {driver.destinations.map((d) => (
              <span
                key={d}
                style={{
                  background: '#F0FDF4',
                  color: '#1B4332',
                  borderRadius: 6,
                  padding: '3px 10px',
                  fontSize: 12,
                  fontWeight: 500,
                  border: '1px solid #D1FAE5',
                }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Feedback */}
      {driver.feedbacks.length > 0 && (
        <div
          style={{
            background: '#fff',
            borderRadius: 14,
            padding: '16px 20px',
            border: '1px solid #E2E8F0',
          }}
        >
          <div className="flex items-center gap-2 mb-12px">
            <MessageSquare size={13} color="#40916C" />
            <p style={{ fontSize: 12, fontWeight: 600, color: '#64748B', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Passenger Feedback
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {driver.feedbacks.map((fb, i) => (
              <div
                key={i}
                style={{
                  background: '#F8FAFC',
                  borderLeft: '3px solid #40916C',
                  borderRadius: '0 8px 8px 0',
                  padding: '8px 12px',
                  fontSize: 13,
                  color: '#374151',
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                }}
              >
                "{fb}"
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
