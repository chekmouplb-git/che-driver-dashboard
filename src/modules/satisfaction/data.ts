import { SatisfactionRow, StaffStats, ALL_SATISFACTION_METRICS } from '@/types';

// Converts "Very Satisfied (5)" → 5, "Satisfied (4)" → 4, etc.
export function parseRating(text: string | number): number {
  if (typeof text === 'number') return Math.min(5, Math.max(1, text));
  if (!text) return 0;
  const match = String(text).match(/\((\d)\)/);
  if (match) return parseInt(match[1], 10);
  const scale: Record<string, number> = {
    'very satisfied': 5,
    'satisfied': 4,
    'neither satisfied nor dissatisfied': 3,
    'dissatisfied': 2,
    'very dissatisfied': 1,
  };
  return scale[String(text).toLowerCase().trim()] ?? 0;
}

export function computeStaffStats(data: SatisfactionRow[]): StaffStats[] {
  const grouped: Record<string, SatisfactionRow[]> = {};
  data.forEach((row) => {
    const key = row.staffHandled?.trim() || 'Unspecified';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(row);
  });

  return Object.entries(grouped).map(([name, rows]) => {
    const avg = (key: keyof SatisfactionRow) =>
      rows.reduce((sum, r) => sum + ((r[key] as number) || 0), 0) / rows.length;

    const metrics = {
      avgResponsiveness:   avg('responsiveness'),
      avgReliability:      avg('reliability'),
      avgAccessFacilities: avg('accessFacilities'),
      avgCommunication:    avg('communication'),
      avgCosts:            avg('costs'),
      avgIntegrity:        avg('integrity'),
      avgAssurance:        avg('assurance'),
      avgOutcome:          avg('outcome'),
    };

    const validMetrics = ALL_SATISFACTION_METRICS.filter((k) => metrics[k] > 0);
    const avgOverall = validMetrics.length > 0
      ? validMetrics.reduce((s, k) => s + metrics[k], 0) / validMetrics.length
      : 0;

    const sorted = [...rows].sort(
      (a, b) => new Date(a.dateOfTransaction || a.timestamp).getTime() - new Date(b.dateOfTransaction || b.timestamp).getTime()
    );

    const recentRatings = sorted.map((r) => {
      const vals = [r.responsiveness, r.reliability, r.accessFacilities, r.communication, r.costs, r.integrity, r.assurance, r.outcome].filter(Boolean);
      return {
        date: r.dateOfTransaction || r.timestamp?.split(' ')[0] || '',
        avg: vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0,
      };
    });

    return {
      name,
      totalResponses: rows.length,
      avgOverall,
      ...metrics,
      comments: rows.filter((r) => r.comments).map((r) => r.comments),
      services: [...new Set(rows.map((r) => r.servicesAvailed).filter(Boolean))],
      modes: [...new Set(rows.map((r) => r.modeOfTransaction).filter(Boolean))],
      recentRatings,
    };
  });
}

export function getRatingLabel(avg: number): { label: string; color: string; bg: string } {
  if (avg >= 4.5) return { label: 'Outstanding',    color: '#15803D', bg: '#DCFCE7' };
  if (avg >= 3.5) return { label: 'Very Satisfied', color: '#065F46', bg: '#D1FAE5' };
  if (avg >= 2.5) return { label: 'Satisfied',      color: '#854D0E', bg: '#FEF9C3' };
  if (avg >= 1.5) return { label: 'Dissatisfied',   color: '#9A3412', bg: '#FEE2E2' };
  return            { label: 'Needs Attention',      color: '#991B1B', bg: '#FEE2E2' };
}
