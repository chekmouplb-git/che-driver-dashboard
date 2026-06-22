'use client';

import { useState, useMemo, useCallback } from 'react';
import { Search, Car, Users, Star, TrendingUp, RefreshCw } from 'lucide-react';
import { FeedbackRow, DriverStats } from '@/types';
import { SAMPLE_DATA, computeDriverStats } from './data';
import { APPS_SCRIPT_URLS } from '@/lib/config';
import DriverCard from './DriverCard';
import DriverDetail from './DriverDetail';
import DataImport from '@/components/DataImport';

function KpiCard({ icon, label, value, sub, color }: {
  icon: React.ReactNode; label: string; value: string; sub?: string; color: string;
}) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: '16px 20px', border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', flex: 1 }}>
      <div className="flex items-center gap-2 mb-1">
        <div style={{ color }}>{icon}</div>
        <span style={{ fontSize: 11, color: '#64748B', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
      </div>
      <p style={{ fontSize: 22, fontWeight: 800, color: '#1B4332', margin: 0 }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: '#94A3B8', margin: '2px 0 0' }}>{sub}</p>}
    </div>
  );
}

export default function DriverModule() {
  const [rawData, setRawData] = useState<FeedbackRow[]>(SAMPLE_DATA);
  const [isCustomData, setIsCustomData] = useState(false);
  const [isLiveData, setIsLiveData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastFetched, setLastFetched] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState('');
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const fetchLiveData = useCallback(async () => {
    const url = APPS_SCRIPT_URLS.driver;
    if (!url || url.includes('YOUR_')) {
      setFetchError('No Apps Script URL configured. Add it to src/lib/config.ts');
      return;
    }
    setLoading(true);
    setFetchError('');
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Network error');
      const json = await res.json();
      if (!json.data || json.data.length === 0) throw new Error('No data returned');
      setRawData(json.data);
      setIsLiveData(true);
      setIsCustomData(false);
      setSelectedDriver(null);
      setLastFetched(new Date().toLocaleTimeString());
    } catch {
      setFetchError('Could not reach the Apps Script API. Check your URL in config.ts.');
    } finally {
      setLoading(false);
    }
  }, []);

  const drivers = useMemo(() =>
    computeDriverStats(rawData).sort((a, b) => b.avgOverall - a.avgOverall),
    [rawData]
  );

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Module header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: '#1B4332', margin: 0 }}>
            🚗 Driving Feedback
          </h1>
          <p style={{ fontSize: 12, color: '#64748B', margin: '2px 0 0' }}>
            Driver efficiency & passenger ratings from Google Forms
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {lastFetched && (
            <span style={{ fontSize: 11, color: '#40916C' }}>● Live · {lastFetched}</span>
          )}
          <button
            onClick={fetchLiveData}
            disabled={loading}
            style={{
              background: loading ? '#D1FAE5' : '#1B4332',
              color: loading ? '#40916C' : '#fff',
              border: 'none', borderRadius: 8, padding: '8px 16px',
              fontSize: 12, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            <RefreshCw size={13} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
            {loading ? 'Loading...' : 'Load Live Data'}
          </button>
        </div>
      </div>

      {/* Error */}
      {fetchError && (
        <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#991B1B' }}>
          ⚠️ {fetchError}
        </div>
      )}

      {/* KPIs */}
      <div style={{ display: 'flex', gap: 12 }}>
        <KpiCard icon={<Car size={16} />} label="Total Trips" value={String(totalTrips)} sub="evaluated" color="#40916C" />
        <KpiCard icon={<Users size={16} />} label="Drivers" value={String(drivers.length)} sub="on record" color="#40916C" />
        <KpiCard icon={<Star size={16} />} label="Fleet Average" value={avgAll > 0 ? avgAll.toFixed(2) : '—'} sub="all 7 metrics" color="#40916C" />
        <KpiCard icon={<TrendingUp size={16} />} label="Top Performer" value={topDriver?.name.split(' ')[0] ?? '—'} sub={topDriver ? `${topDriver.avgOverall.toFixed(2)} avg` : ''} color="#40916C" />
      </div>

      {/* Main split */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {/* Sidebar list */}
        <div style={{ width: 280, flexShrink: 0 }}>
          <DataImport
            onImport={(rows) => { setRawData(rows); setIsCustomData(true); setIsLiveData(false); setSelectedDriver(null); }}
            onReset={() => { setRawData(SAMPLE_DATA); setIsCustomData(false); setIsLiveData(false); setSelectedDriver(null); }}
            isCustomData={isCustomData}
          />
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search driver..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', paddingLeft: 30, paddingRight: 10, paddingTop: 8, paddingBottom: 8, border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 13, background: '#fff', color: '#1E293B', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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

        {/* Detail */}
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

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
