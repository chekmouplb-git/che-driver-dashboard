'use client';

import { useState, useMemo } from 'react';
import { Search, Users, Star, TrendingUp, Car } from 'lucide-react';
import { SAMPLE_DATA, computeDriverStats } from '@/lib/data';
import { FeedbackRow, DriverStats } from '@/types';
import DriverCard from '@/components/DriverCard';
import DriverDetail from '@/components/DriverDetail';
import DataImport from '@/components/DataImport';

function KpiCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 14,
        padding: '16px 20px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      <div className="flex items-center gap-3 mb-1">
        <div style={{ color: '#40916C' }}>{icon}</div>
        <span style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>{label}</span>
      </div>
      <p style={{ fontSize: 24, fontWeight: 800, color: '#1B4332', margin: 0 }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: '#94A3B8', margin: '2px 0 0' }}>{sub}</p>}
    </div>
  );
}

export default function Home() {
  const [rawData, setRawData] = useState<FeedbackRow[]>(SAMPLE_DATA);
  const [isCustomData, setIsCustomData] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const drivers = useMemo(() => {
    const stats = computeDriverStats(rawData);
    return stats.sort((a, b) => b.avgOverall - a.avgOverall);
  }, [rawData]);

  const filtered = useMemo(
    () => drivers.filter((d) => d.name.toLowerCase().includes(search.toLowerCase())),
    [drivers, search]
  );

  const activeDriver = useMemo(
    () => drivers.find((d) => d.name === selectedDriver) ?? drivers[0] ?? null,
    [drivers, selectedDriver]
  );

  const totalTrips = rawData.length;
  const avgAll =
    drivers.length > 0
      ? drivers.reduce((s, d) => s + d.avgOverall, 0) / drivers.length
      : 0;
  const topDriver = drivers[0];

  return (
    <div style={{ minHeight: '100vh', background: '#F0FDF4' }}>
      {/* Top nav */}
      <header
        style={{
          background: '#1B4332',
          padding: '0 24px',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div className="flex items-center gap-3">
          <span style={{ fontSize: 22 }}>🚗</span>
          <div>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 15 }}>
              CHE Driver Dashboard
            </span>
            <span style={{ color: '#6EE7B7', fontSize: 12, marginLeft: 8 }}>
              Efficiency & Feedback
            </span>
          </div>
        </div>
        <span style={{ color: '#6EE7B7', fontSize: 12 }}>
          College of Human Ecology · UPLB
        </span>
      </header>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px' }}>
        {/* KPIs */}
        <div
          className="grid gap-4 mb-6"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
        >
          <KpiCard
            icon={<Car size={18} />}
            label="Total Trips Evaluated"
            value={String(totalTrips)}
            sub="from Google Forms responses"
          />
          <KpiCard
            icon={<Users size={18} />}
            label="Drivers on Record"
            value={String(drivers.length)}
            sub="active in this period"
          />
          <KpiCard
            icon={<Star size={18} />}
            label="Fleet Average Rating"
            value={avgAll.toFixed(2)}
            sub="across all 7 metrics"
          />
          <KpiCard
            icon={<TrendingUp size={18} />}
            label="Top Performer"
            value={topDriver?.name ?? '—'}
            sub={topDriver ? `${topDriver.avgOverall.toFixed(2)} avg · ${topDriver.totalTrips} trips` : ''}
          />
        </div>

        {/* Main layout */}
        <div className="flex gap-5" style={{ alignItems: 'flex-start' }}>
          {/* Sidebar */}
          <div style={{ width: 300, flexShrink: 0 }}>
            {/* Import */}
            <DataImport
              onImport={(rows) => { setRawData(rows); setIsCustomData(true); setSelectedDriver(null); }}
              onReset={() => { setRawData(SAMPLE_DATA); setIsCustomData(false); setSelectedDriver(null); }}
              isCustomData={isCustomData}
            />

            {/* Search */}
            <div style={{ position: 'relative', marginBottom: 14 }}>
              <Search
                size={14}
                style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}
              />
              <input
                type="text"
                placeholder="Search driver..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  paddingLeft: 34,
                  paddingRight: 12,
                  paddingTop: 9,
                  paddingBottom: 9,
                  border: '1px solid #E2E8F0',
                  borderRadius: 10,
                  fontSize: 13,
                  background: '#fff',
                  color: '#1E293B',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Driver list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {filtered.length === 0 && (
                <p style={{ color: '#94A3B8', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>
                  No drivers found
                </p>
              )}
              {filtered.map((driver, i) => {
                const rank = drivers.findIndex((d) => d.name === driver.name);
                return (
                  <DriverCard
                    key={driver.name}
                    driver={driver}
                    rank={rank}
                    selected={(selectedDriver ?? drivers[0]?.name) === driver.name}
                    onClick={() => setSelectedDriver(driver.name)}
                  />
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {activeDriver ? (
              <DriverDetail driver={activeDriver} allDrivers={drivers} />
            ) : (
              <div
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: 48,
                  textAlign: 'center',
                  border: '1px solid #E2E8F0',
                  color: '#94A3B8',
                }}
              >
                <span style={{ fontSize: 40 }}>🚗</span>
                <p style={{ fontSize: 15, marginTop: 12 }}>Select a driver to view their performance</p>
              </div>
            )}
          </div>
        </div>

        <footer style={{ textAlign: 'center', marginTop: 32, color: '#94A3B8', fontSize: 11 }}>
          CHE Driver Feedback Dashboard · Data sourced from Google Forms · {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}
