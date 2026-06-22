/* ─── Shared module types ─── */

export type ModuleId = 'driver' | 'cleanliness' | 'restroom';

export interface ModuleConfig {
  id: ModuleId;
  label: string;
  sublabel: string;
  icon: string;
  color: string;          // CSS hex for accent
  colorLight: string;     // light background tint
  colorBorder: string;    // border tint
  available: boolean;
  comingSoon?: string;    // message shown when not yet available
}

export const MODULES: ModuleConfig[] = [
  {
    id: 'driver',
    label: 'Driving Feedback',
    sublabel: 'Driver efficiency & ratings',
    icon: '🚗',
    color: '#1B4332',
    colorLight: '#F0FDF4',
    colorBorder: '#D1FAE5',
    available: true,
  },
  {
    id: 'cleanliness',
    label: 'CHE Cleanliness',
    sublabel: 'Building & facility cleanliness',
    icon: '🧹',
    color: '#1E3A5F',
    colorLight: '#EFF6FF',
    colorBorder: '#BFDBFE',
    available: false,
    comingSoon: 'Connect your CHE Cleanliness Google Form to activate this module.',
  },
  {
    id: 'restroom',
    label: 'Restroom Cleanliness',
    sublabel: 'Restroom condition & upkeep',
    icon: '🚻',
    color: '#3B0764',
    colorLight: '#FAF5FF',
    colorBorder: '#E9D5FF',
    available: false,
    comingSoon: 'Connect your Restroom Cleanliness Google Form to activate this module.',
  },
];

/* ─── Driver module types (unchanged) ─── */

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
