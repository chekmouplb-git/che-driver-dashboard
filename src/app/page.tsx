'use client';

import { useState } from 'react';
import { MODULES, ModuleId } from '@/types';
import Sidebar from '@/components/Sidebar';
import ComingSoonModule from '@/components/ComingSoonModule';
import DriverModule from '@/modules/driver/DriverModule';

export default function Home() {
  const [activeModule, setActiveModule] = useState<ModuleId>('driver');

  const mod = MODULES.find((m) => m.id === activeModule)!;

  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9' }}>
      {/* Top nav bar */}
      <header
        style={{
          background: '#0F2419',
          height: 48,
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          gap: 14,
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 800, color: '#6EE7B7', letterSpacing: '0.04em' }}>
          CHE Feedback Hub
        </span>
        <span style={{ color: '#374151', fontSize: 14 }}>·</span>
        <span style={{ fontSize: 13, color: '#6B7280' }}>
          {mod.icon} {mod.label}
        </span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#374151', fontWeight: 500 }}>
          College of Human Ecology · UPLB
        </span>
      </header>

      {/* Main layout */}
      <div
        style={{
          maxWidth: 1320,
          margin: '0 auto',
          padding: '20px 16px',
          display: 'flex',
          gap: 16,
          alignItems: 'flex-start',
        }}
      >
        {/* Left sidebar nav */}
        <Sidebar
          modules={MODULES}
          activeId={activeModule}
          onChange={setActiveModule}
        />

        {/* Module content */}
        <main
          style={{
            flex: 1,
            minWidth: 0,
            background: '#fff',
            borderRadius: 16,
            padding: '20px 24px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          {activeModule === 'driver' && <DriverModule />}
          {activeModule === 'cleanliness' && (
            <ComingSoonModule module={MODULES.find((m) => m.id === 'cleanliness')!} />
          )}
          {activeModule === 'restroom' && (
            <ComingSoonModule module={MODULES.find((m) => m.id === 'restroom')!} />
          )}
        </main>
      </div>

      <footer
        style={{ textAlign: 'center', padding: '16px 0 24px', color: '#94A3B8', fontSize: 11 }}
      >
        CHE Feedback Hub · All data from Google Forms · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
