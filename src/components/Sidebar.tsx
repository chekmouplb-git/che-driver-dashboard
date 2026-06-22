'use client';

import { ModuleConfig, ModuleId } from '@/types';

interface SidebarProps {
  modules: ModuleConfig[];
  activeId: ModuleId;
  onChange: (id: ModuleId) => void;
}

export default function Sidebar({ modules, activeId, onChange }: SidebarProps) {
  return (
    <aside
      style={{
        width: 76,
        flexShrink: 0,
        background: '#0F2419',
        borderRadius: 16,
        padding: '16px 8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        minHeight: 'calc(100vh - 48px)',
        position: 'sticky',
        top: 24,
      }}
    >
      {/* Logo mark */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: '#1B4332',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 12,
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 800, color: '#6EE7B7', letterSpacing: '0.04em', textAlign: 'center', lineHeight: 1.2 }}>
          CHE<br/>HUB
        </span>
      </div>

      {/* Divider */}
      <div style={{ width: 32, height: 1, background: '#1B4332', marginBottom: 6 }} />

      {/* Module buttons */}
      {modules.map((mod) => {
        const isActive = mod.id === activeId;
        return (
          <button
            key={mod.id}
            onClick={() => onChange(mod.id)}
            title={mod.label}
            style={{
              width: 58,
              height: 58,
              borderRadius: 14,
              border: 'none',
              background: isActive ? mod.color : 'transparent',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              transition: 'all 0.15s',
              opacity: mod.available ? 1 : 0.45,
              position: 'relative',
            }}
          >
            <span style={{ fontSize: 22 }}>{mod.icon}</span>
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: isActive ? '#fff' : '#6B7280',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                lineHeight: 1,
                textAlign: 'center',
              }}
            >
              {mod.id === 'driver' ? 'Drive' : mod.id === 'cleanliness' ? 'Clean' : 'Room'}
            </span>

            {/* Active indicator dot */}
            {isActive && (
              <span
                style={{
                  position: 'absolute',
                  right: -4,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 4,
                  height: 24,
                  borderRadius: 2,
                  background: mod.colorLight,
                }}
              />
            )}

            {/* Lock badge for unavailable modules */}
            {!mod.available && (
              <span
                style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  fontSize: 9,
                  background: '#374151',
                  color: '#9CA3AF',
                  borderRadius: 4,
                  padding: '1px 3px',
                }}
              >
                🔒
              </span>
            )}
          </button>
        );
      })}

      {/* Add future module hint */}
      <div
        style={{
          width: 58,
          height: 44,
          borderRadius: 12,
          border: '1.5px dashed #1B4332',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 'auto',
          cursor: 'default',
        }}
      >
        <span style={{ fontSize: 18, color: '#374151' }}>＋</span>
      </div>
    </aside>
  );
}
