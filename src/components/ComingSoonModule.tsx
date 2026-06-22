'use client';

import { ModuleConfig } from '@/types';

interface ComingSoonModuleProps {
  module: ModuleConfig;
}

export default function ComingSoonModule({ module }: ComingSoonModuleProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 420, textAlign: 'center', padding: '48px 32px' }}>
      {/* Icon */}
      <div style={{ width: 80, height: 80, borderRadius: 20, background: module.colorLight, border: `2px solid ${module.colorBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, marginBottom: 20 }}>
        {module.icon}
      </div>

      {/* Badge */}
      <div style={{ background: '#F1F5F9', borderRadius: 20, padding: '4px 14px', fontSize: 11, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>
        Coming Soon
      </div>

      <h2 style={{ fontSize: 22, fontWeight: 800, color: module.color, margin: '0 0 10px' }}>
        {module.label}
      </h2>

      <p style={{ fontSize: 14, color: '#64748B', maxWidth: 340, lineHeight: 1.7, margin: 0 }}>
        We're working on this. Check back soon for {module.sublabel.toLowerCase()} results and insights.
      </p>
    </div>
  );
}
