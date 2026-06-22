'use client';

interface MetricBarProps {
  label: string;
  value: number;
  max?: number;
  icon?: string;
}

export default function MetricBar({ label, value, max = 5, icon }: MetricBarProps) {
  const pct = (value / max) * 100;
  const color =
    value >= 4.5 ? '#22C55E' : value >= 3.5 ? '#40916C' : value >= 2.5 ? '#F59E0B' : '#EF4444';

  return (
    <div style={{ marginBottom: 10 }}>
      <div className="flex justify-between items-center mb-1">
        <span style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>
          {icon && <span style={{ marginRight: 4 }}>{icon}</span>}
          {label}
        </span>
        <span style={{ fontSize: 13, fontWeight: 700, color }}>
          {value.toFixed(2)}
        </span>
      </div>
      <div
        style={{
          background: '#F1F5F9',
          borderRadius: 99,
          height: 7,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            background: color,
            height: '100%',
            borderRadius: 99,
            transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>
    </div>
  );
}
