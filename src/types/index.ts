export interface FeedbackRow {
  timestamp: string;
  email: string;
  fullName: string;
  organization: string;
  clientCategory: string;
  driverName: string;
  carUsed: string;
  dateOfTrip: string;
  destination: string;
  responsiveness: number;
  reliability: number;
  punctuality: number;
  roadDiscipline: number;
  knowledgeOfRoutes: number;
  vehicleCleanliness: number;
  drivingComfort: number;
  feedback: string;
}

export interface DriverStats {
  name: string;
  totalTrips: number;
  avgOverall: number;
  avgResponsiveness: number;
  avgReliability: number;
  avgPunctuality: number;
  avgRoadDiscipline: number;
  avgKnowledgeOfRoutes: number;
  avgVehicleCleanliness: number;
  avgDrivingComfort: number;
  feedbacks: string[];
  cars: string[];
  destinations: string[];
  recentRatings: { date: string; avg: number }[];
}

export type MetricKey =
  | 'avgResponsiveness'
  | 'avgReliability'
  | 'avgPunctuality'
  | 'avgRoadDiscipline'
  | 'avgKnowledgeOfRoutes'
  | 'avgVehicleCleanliness'
  | 'avgDrivingComfort';

export const METRIC_LABELS: Record<MetricKey, string> = {
  avgResponsiveness: 'Responsiveness',
  avgReliability: 'Reliability',
  avgPunctuality: 'Punctuality',
  avgRoadDiscipline: 'Road Discipline',
  avgKnowledgeOfRoutes: 'Route Knowledge',
  avgVehicleCleanliness: 'Cleanliness',
  avgDrivingComfort: 'Driving Comfort',
};

export const ALL_METRICS: MetricKey[] = [
  'avgResponsiveness',
  'avgReliability',
  'avgPunctuality',
  'avgRoadDiscipline',
  'avgKnowledgeOfRoutes',
  'avgVehicleCleanliness',
  'avgDrivingComfort',
];
