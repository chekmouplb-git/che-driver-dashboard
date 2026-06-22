import { FeedbackRow, DriverStats, ALL_METRICS } from '@/types';

export const SAMPLE_DATA: FeedbackRow[] = [
  {
    timestamp: '2024-01-15 08:30:00',
    email: '',
    fullName: 'Maria Santos',
    organization: 'College of Human Ecology',
    clientCategory: 'Faculty',
    driverName: 'Juan dela Cruz',
    carUsed: 'Toyota Innova (SJR 123)',
    dateOfTrip: '2024-01-14',
    destination: 'Provincial Capitol, Sta. Cruz, Laguna',
    responsiveness: 5,
    reliability: 5,
    punctuality: 4,
    roadDiscipline: 5,
    knowledgeOfRoutes: 5,
    vehicleCleanliness: 5,
    drivingComfort: 4,
    feedback: 'Very professional driver. Always on time and courteous.',
  },
  {
    timestamp: '2024-01-18 10:00:00',
    email: 'pedro@uplb.edu.ph',
    fullName: 'Pedro Reyes',
    organization: 'Office of the Chancellor',
    clientCategory: 'Staff',
    driverName: 'Juan dela Cruz',
    carUsed: 'Toyota Innova (SJR 123)',
    dateOfTrip: '2024-01-17',
    destination: 'Provincial Capitol, Sta. Cruz, Laguna',
    responsiveness: 4,
    reliability: 5,
    punctuality: 5,
    roadDiscipline: 5,
    knowledgeOfRoutes: 4,
    vehicleCleanliness: 4,
    drivingComfort: 5,
    feedback: 'Smooth and safe ride. Arrived on time.',
  },
  {
    timestamp: '2024-01-20 14:15:00',
    email: '',
    fullName: 'Ana Lim',
    organization: 'College of Human Ecology',
    clientCategory: 'Student',
    driverName: 'Roberto Mendoza',
    carUsed: 'Mitsubishi Strada (WXY 456)',
    dateOfTrip: '2024-01-19',
    destination: 'Provincial Capitol, Sta. Cruz, Laguna',
    responsiveness: 3,
    reliability: 4,
    punctuality: 3,
    roadDiscipline: 4,
    knowledgeOfRoutes: 5,
    vehicleCleanliness: 3,
    drivingComfort: 4,
    feedback: 'Driver knows the roads well but was slightly late.',
  },
  {
    timestamp: '2024-01-22 09:45:00',
    email: '',
    fullName: 'Jose Garcia',
    organization: 'University Health Service',
    clientCategory: 'Faculty',
    driverName: 'Roberto Mendoza',
    carUsed: 'Mitsubishi Strada (WXY 456)',
    dateOfTrip: '2024-01-21',
    destination: 'Provincial Capitol, Sta. Cruz, Laguna',
    responsiveness: 4,
    reliability: 3,
    punctuality: 4,
    roadDiscipline: 4,
    knowledgeOfRoutes: 4,
    vehicleCleanliness: 4,
    drivingComfort: 3,
    feedback: 'Generally okay. Vehicle could be cleaner.',
  },
  {
    timestamp: '2024-02-05 11:30:00',
    email: 'carla@che.uplb.edu.ph',
    fullName: 'Carla Villanueva',
    organization: 'College of Human Ecology',
    clientCategory: 'Faculty',
    driverName: 'Eduardo Bautista',
    carUsed: 'Toyota HiAce (PQR 789)',
    dateOfTrip: '2024-02-04',
    destination: 'Provincial Capitol, Sta. Cruz, Laguna',
    responsiveness: 5,
    reliability: 5,
    punctuality: 5,
    roadDiscipline: 5,
    knowledgeOfRoutes: 5,
    vehicleCleanliness: 5,
    drivingComfort: 5,
    feedback: 'Excellent in every way! Highly recommend.',
  },
  {
    timestamp: '2024-02-10 13:00:00',
    email: '',
    fullName: 'Mark Torres',
    organization: 'UPLB Research Division',
    clientCategory: 'Staff',
    driverName: 'Eduardo Bautista',
    carUsed: 'Toyota HiAce (PQR 789)',
    dateOfTrip: '2024-02-09',
    destination: 'Provincial Capitol, Sta. Cruz, Laguna',
    responsiveness: 5,
    reliability: 5,
    punctuality: 4,
    roadDiscipline: 5,
    knowledgeOfRoutes: 5,
    vehicleCleanliness: 5,
    drivingComfort: 5,
    feedback: 'Very comfortable and safe ride. Driver was very helpful.',
  },
  {
    timestamp: '2024-02-14 08:00:00',
    email: '',
    fullName: 'Luz Flores',
    organization: 'College of Human Ecology',
    clientCategory: 'Faculty',
    driverName: 'Juan dela Cruz',
    carUsed: 'Toyota Innova (SJR 123)',
    dateOfTrip: '2024-02-13',
    destination: 'Provincial Capitol, Sta. Cruz, Laguna',
    responsiveness: 5,
    reliability: 4,
    punctuality: 5,
    roadDiscipline: 5,
    knowledgeOfRoutes: 5,
    vehicleCleanliness: 4,
    drivingComfort: 5,
    feedback: 'Great experience! Very responsive and safe.',
  },
  {
    timestamp: '2024-03-01 09:00:00',
    email: '',
    fullName: 'Ramon Aquino',
    organization: 'Office of the Chancellor',
    clientCategory: 'Staff',
    driverName: 'Roberto Mendoza',
    carUsed: 'Mitsubishi Strada (WXY 456)',
    dateOfTrip: '2024-02-28',
    destination: 'Provincial Capitol, Sta. Cruz, Laguna',
    responsiveness: 2,
    reliability: 3,
    punctuality: 2,
    roadDiscipline: 3,
    knowledgeOfRoutes: 3,
    vehicleCleanliness: 2,
    drivingComfort: 3,
    feedback: 'Driver was late and did not communicate well. Vehicle needs cleaning.',
  },
  {
    timestamp: '2024-03-08 10:30:00',
    email: '',
    fullName: 'Teresa Navarro',
    organization: 'College of Human Ecology',
    clientCategory: 'Faculty',
    driverName: 'Eduardo Bautista',
    carUsed: 'Toyota HiAce (PQR 789)',
    dateOfTrip: '2024-03-07',
    destination: 'Provincial Capitol, Sta. Cruz, Laguna',
    responsiveness: 5,
    reliability: 5,
    punctuality: 5,
    roadDiscipline: 4,
    knowledgeOfRoutes: 5,
    vehicleCleanliness: 5,
    drivingComfort: 4,
    feedback: 'Very reliable and clean vehicle. Professional driver.',
  },
  {
    timestamp: '2024-03-15 14:00:00',
    email: 'nina@uplb.edu.ph',
    fullName: 'Nina Cruz',
    organization: 'UPLB Research Division',
    clientCategory: 'Student',
    driverName: 'Juan dela Cruz',
    carUsed: 'Toyota Innova (SJR 123)',
    dateOfTrip: '2024-03-14',
    destination: 'Provincial Capitol, Sta. Cruz, Laguna',
    responsiveness: 4,
    reliability: 5,
    punctuality: 4,
    roadDiscipline: 5,
    knowledgeOfRoutes: 4,
    vehicleCleanliness: 5,
    drivingComfort: 5,
    feedback: 'Very comfortable trip. Driver was friendly and helpful.',
  },
];

export function computeDriverStats(data: FeedbackRow[]): DriverStats[] {
  const grouped: Record<string, FeedbackRow[]> = {};
  data.forEach((row) => {
    if (!grouped[row.driverName]) grouped[row.driverName] = [];
    grouped[row.driverName].push(row);
  });

  return Object.entries(grouped).map(([name, rows]) => {
    const avg = (key: keyof FeedbackRow) =>
      rows.reduce((sum, r) => sum + (r[key] as number), 0) / rows.length;

    const metrics = {
      avgResponsiveness: avg('responsiveness'),
      avgReliability: avg('reliability'),
      avgPunctuality: avg('punctuality'),
      avgRoadDiscipline: avg('roadDiscipline'),
      avgKnowledgeOfRoutes: avg('knowledgeOfRoutes'),
      avgVehicleCleanliness: avg('vehicleCleanliness'),
      avgDrivingComfort: avg('drivingComfort'),
    };

    const avgOverall =
      ALL_METRICS.reduce((sum, k) => sum + metrics[k], 0) / ALL_METRICS.length;

    const sortedRows = [...rows].sort(
      (a, b) => new Date(a.dateOfTrip).getTime() - new Date(b.dateOfTrip).getTime()
    );

    const recentRatings = sortedRows.map((r) => ({
      date: r.dateOfTrip,
      avg:
        (r.responsiveness +
          r.reliability +
          r.punctuality +
          r.roadDiscipline +
          r.knowledgeOfRoutes +
          r.vehicleCleanliness +
          r.drivingComfort) /
        7,
    }));

    return {
      name,
      totalTrips: rows.length,
      avgOverall,
      ...metrics,
      feedbacks: rows.filter((r) => r.feedback).map((r) => r.feedback),
      cars: [...new Set(rows.map((r) => r.carUsed))],
      destinations: [...new Set(rows.map((r) => r.destination))],
      recentRatings,
    };
  });
}

export function parseCSV(text: string): FeedbackRow[] {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];

  const rows: FeedbackRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
    if (cols.length < 16) continue;

    const toNum = (s: string) => {
      const n = parseInt(s, 10);
      return isNaN(n) ? 0 : Math.min(5, Math.max(1, n));
    };

    rows.push({
      timestamp: cols[0],
      email: cols[1],
      fullName: cols[2],
      organization: cols[3],
      clientCategory: cols[4],
      driverName: cols[5],
      carUsed: cols[6],
      dateOfTrip: cols[7],
      destination: cols[8],
      responsiveness: toNum(cols[9]),
      reliability: toNum(cols[10]),
      punctuality: toNum(cols[11]),
      roadDiscipline: toNum(cols[12]),
      knowledgeOfRoutes: toNum(cols[13]),
      vehicleCleanliness: toNum(cols[14]),
      drivingComfort: toNum(cols[15]),
      feedback: cols[16] || '',
    });
  }
  return rows;
}
