'use client';

import { ModuleConfig } from '@/types';

interface ComingSoonModuleProps {
  module: ModuleConfig;
}

export default function ComingSoonModule({ module }: ComingSoonModuleProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 420,
        textAlign: 'center',
        padding: '48px 32px',
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 20,
          background: module.colorLight,
          border: `2px solid ${module.colorBorder}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
          marginBottom: 24,
        }}
      >
        {module.icon}
      </div>

      <h2
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: module.color,
          margin: '0 0 10px',
        }}
      >
        {module.label}
      </h2>

      <p
        style={{
          fontSize: 14,
          color: '#64748B',
          maxWidth: 380,
          lineHeight: 1.6,
          margin: '0 0 28px',
        }}
      >
        {module.comingSoon}
      </p>

      <div
        style={{
          background: module.colorLight,
          border: `1px solid ${module.colorBorder}`,
          borderRadius: 12,
          padding: '16px 24px',
          maxWidth: 420,
          textAlign: 'left',
        }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: module.color,
            margin: '0 0 10px',
          }}
        >
          To activate this module:
        </p>
        <ol style={{ margin: 0, padding: '0 0 0 18px', fontSize: 13, color: '#374151', lineHeight: 2 }}>
          <li>Create your Google Form with the relevant questions</li>
          <li>Link it to a Google Sheet (Responses → Sheets icon)</li>
          <li>Set up an Apps Script Web App on that sheet</li>
          <li>Add the Web App URL to <code style={{ background: '#E2E8F0', borderRadius: 4, padding: '1px 6px' }}>src/lib/config.ts</code></li>
          <li>Share your form headers here and we'll wire up the dashboard</li>
        </ol>
      </div>

      <div
        style={{
          marginTop: 20,
          padding: '8px 16px',
          borderRadius: 20,
          background: '#F1F5F9',
          fontSize: 12,
          color: '#94A3B8',
          fontWeight: 500,
        }}
      >
        🔒 Module locked · Share form details to unlock
      </div>
    </div>
  );
}
