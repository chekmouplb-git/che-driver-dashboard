'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { Search, Users, Star, TrendingUp, Car, RefreshCw } from 'lucide-react';
import { SAMPLE_DATA, computeDriverStats } from '@/lib/data';
import { FeedbackRow, DriverStats } from '@/types';
import { APPS_SCRIPT_URL } from '@/lib/config';
import DriverCard from '@/components/DriverCard';
import DriverDetail from '@/components/DriverDetail';
import DataImport from '@/components/DataImport';

function KpiCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: '16px 20px', border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
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
  const [isLiveData, setIsLiveData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastFetched, setLastFetched] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState('');
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const fetchLiveData = useCallback(async () => {
    setLoading(true);
    setFetchError('');
    try {
      const res = await fetch(APPS_SCRIPT_URL);
      if (!res.ok) throw new Error('Network error');
      const json = await res.json();
      if (!json.data || json.data.length === 0) throw new Error('No data returned');
      setRawData(json.data);
      setIsLiveData(true);
      setIsCustomData(false);
      setSelectedDriver(null);
      setLastFetched(new Date().toLocaleTimeString());
    } catch (e: any) {
      setFetchError('Could not reach the Apps Script API. Check your URL in config.ts.');
    } finally {
      setLoading(false);
    }
  }, []);

  const drivers = useMemo(() => {
    return computeDriverStats(rawData).sort((a, b) => b.avgOverall - a.avgOverall);
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
  const avgAll = drivers.length > 0 ? drivers.reduce((s, d) => s + d.avgOverall, 0) / drivers.length : 0;
  const topDriver = drivers[0];

  return (
    <div style={{ minHeight: '100vh', background: '#F0FDF4' }}>
      {/* Top nav */}
      <header style={{ background: '#1B4332', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="flex items-center gap-3">
          <span style={{ fontSize: 22 }}>🚗</span>
          <div>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 15 }}>CHE Driver Dashboard</span>
            <span style={{ color: '#6EE7B7', fontSize: 12, marginLeft: 8 }}>Efficiency & Feedback</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {lastFetched && (
            <span style={{ color: '#6EE7B7', fontSize: 11 }}>Live · updated {lastFetched}</span>
          )}
          <button
            onClick={fetchLiveData}
            disabled={loading}
            style={{ background: loading ? '#2D6A4F' : '#40916C', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <RefreshCw size={13} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
            {loading ? 'Loading...' : 'Load Live Data'}
          </button>
        </div>
      </header>

      {/* Error banner */}
      {fetchError && (
        <div style={{ background: '#FEE2E2', borderBottom: '1px solid #FCA5A5', padding: '8px 24px', fontSize: 13, color: '#991B1B' }}>
          ⚠️ {fetchError}
        </div>
      )}

      {/* Live data badge */}
      {isLiveData && (
        <div style={{ background: '#D1FAE5', borderBottom: '1px solid #6EE7B7', padding: '6px 24px', fontSize: 12, color: '#065F46', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 7, height: 7, background: '#22C55E', borderRadius: '50%', display: 'inline-block' }} />
          Showing live data from Google Forms · {totalTrips} responses loaded
        </div>
      )}

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px' }}>
        {/* KPIs */}
        <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <KpiCard icon={<Car size={18} />} label="Total Trips Evaluated" value={String(totalTrips)} sub="from Google Forms responses" />
          <KpiCard icon={<Users size={18} />} label="Drivers on Record" value={String(drivers.length)} sub="active in this period" />
          <KpiCard icon={<Star size={18} />} label="Fleet Average Rating" value={avgAll.toFixed(2)} sub="across all 7 metrics" />
          <KpiCard icon={<TrendingUp size={18} />} label="Top Performer" value={topDriver?.name ?? '—'} sub={topDriver ? `${topDriver.avgOverall.toFixed(2)} avg · ${topDriver.totalTrips} trips` : ''} />
        </div>

        <div className="flex gap-5" style={{ alignItems: 'flex-start' }}>
          {/* Sidebar */}
          <div style={{ width: 300, flexShrink: 0 }}>
            <DataImport
              onImport={(rows) => { setRawData(rows); setIsCustomData(true); setIsLiveData(false); setSelectedDriver(null); }}
              onReset={() => { setRawData(SAMPLE_DATA); setIsCustomData(false); setIsLiveData(false); setSelectedDriver(null); }}
              isCustomData={isCustomData}
            />
            <div style={{ position: 'relative', marginBottom: 14 }}>
              <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input
                type="text"
                placeholder="Search driver..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%', paddingLeft: 34, paddingRight: 12, paddingTop: 9, paddingBottom: 9, border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 13, background: '#fff', color: '#1E293B', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {filtered.length === 0 && (
                <p style={{ color: '#94A3B8', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>No drivers found</p>
              )}
              {filtered.map((driver) => {
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
              <div style={{ background: '#fff', borderRadius: 16, padding: 48, textAlign: 'center', border: '1px solid #E2E8F0', color: '#94A3B8' }}>
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

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}