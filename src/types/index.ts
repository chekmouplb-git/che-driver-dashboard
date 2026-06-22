/* ─── Shared module types ─── */

export type ModuleId = 'driver' | 'satisfaction' | 'cleanliness' | 'restroom';

export interface ModuleConfig {
  id: ModuleId;
  label: string;
  sublabel: string;
  icon: string;
  color: string;
  colorLight: string;
  colorBorder: string;
  available: boolean;
  comingSoon?: string;
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
    id: 'satisfaction',
    label: 'Client Satisfaction',
    sublabel: 'CHE DO client satisfaction survey',
    icon: '📋',
    color: '#7C3AED',
    colorLight: '#FAF5FF',
    colorBorder: '#E9D5FF',
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
    color: '#0F766E',
    colorLight: '#F0FDFA',
    colorBorder: '#99F6E4',
    available: false,
    comingSoon: 'Connect your Restroom Cleanliness Google Form to activate this module.',
  },
];

/* ─── Driver module types ─── */

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

/* ─── Satisfaction module types ─── */

export interface SatisfactionRow {
  timestamp: string;
  fullName: string;
  organization: string;
  clientCategory: string;
  staffHandled: string;
  servicesAvailed: string;
  responsiveness: number;
  reliability: number;
  accessFacilities: number;
  communication: number;
  costs: number;
  integrity: number;
  assurance: number;
  outcome: number;
  comments: string;
  transactionDescription: string;
  dateOfTransaction: string;
  modeOfTransaction: string;
  email: string;
}

export type SatisfactionMetricKey =
  | 'avgResponsiveness'
  | 'avgReliability'
  | 'avgAccessFacilities'
  | 'avgCommunication'
  | 'avgCosts'
  | 'avgIntegrity'
  | 'avgAssurance'
  | 'avgOutcome';

export const SATISFACTION_METRIC_LABELS: Record<SatisfactionMetricKey, string> = {
  avgResponsiveness: 'Responsiveness',
  avgReliability: 'Reliability',
  avgAccessFacilities: 'Access & Facilities',
  avgCommunication: 'Communication',
  avgCosts: 'Costs',
  avgIntegrity: 'Integrity',
  avgAssurance: 'Assurance',
  avgOutcome: 'Outcome',
};

export const ALL_SATISFACTION_METRICS: SatisfactionMetricKey[] = [
  'avgResponsiveness',
  'avgReliability',
  'avgAccessFacilities',
  'avgCommunication',
  'avgCosts',
  'avgIntegrity',
  'avgAssurance',
  'avgOutcome',
];

export interface StaffStats {
  name: string;
  totalResponses: number;
  avgOverall: number;
  avgResponsiveness: number;
  avgReliability: number;
  avgAccessFacilities: number;
  avgCommunication: number;
  avgCosts: number;
  avgIntegrity: number;
  avgAssurance: number;
  avgOutcome: number;
  comments: string[];
  services: string[];
  modes: string[];
  recentRatings: { date: string; avg: number }[];
}
