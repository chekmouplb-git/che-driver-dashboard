'use client';

import { useState } from 'react';
import { Upload, X, CheckCircle } from 'lucide-react';
import { FeedbackRow } from '@/types';
import { parseCSV } from '@/lib/data';

interface DataImportProps {
  onImport: (rows: FeedbackRow[]) => void;
  onReset: () => void;
  isCustomData: boolean;
}

export default function DataImport({ onImport, onReset, isCustomData }: DataImportProps) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');

  const handleFile = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      setError('Please upload a CSV file exported from Google Forms.');
      return;
    }
    setError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = parseCSV(text);
      if (rows.length === 0) {
        setError('No valid rows found. Please check the CSV format.');
        return;
      }
      onImport(rows);
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      {isCustomData ? (
        <div
          style={{
            background: '#F0FDF4',
            border: '1px solid #40916C',
            borderRadius: 10,
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div className="flex items-center gap-2">
            <CheckCircle size={16} color="#40916C" />
            <span style={{ fontSize: 13, color: '#1B4332', fontWeight: 500 }}>
              Custom CSV loaded
            </span>
          </div>
          <button
            onClick={onReset}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 12,
            }}
          >
            <X size={14} /> Reset to sample
          </button>
        </div>
      ) : (
        <div>
          <label
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const file = e.dataTransfer.files[0];
              if (file) handleFile(file);
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              border: `2px dashed ${dragging ? '#40916C' : '#CBD5E1'}`,
              borderRadius: 12,
              padding: '20px 16px',
              background: dragging ? '#F0FDF4' : '#F8FAFC',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
            <Upload size={20} color={dragging ? '#40916C' : '#94A3B8'} />
            <span style={{ fontSize: 13, color: '#64748B', textAlign: 'center', lineHeight: 1.5 }}>
              <strong style={{ color: '#1B4332' }}>Upload CSV</strong> from Google Forms
              <br />
              <span style={{ fontSize: 11 }}>or drop it here · Sample data shown below</span>
            </span>
          </label>
          {error && (
            <p style={{ color: '#EF4444', fontSize: 12, marginTop: 6 }}>{error}</p>
          )}
        </div>
      )}
    </div>
  );
}
