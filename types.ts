export enum ActivityCategory {
  PATIENT_CARE = 'Patient Care',
  CONTINUING_EDUCATION = 'Continuing Education',
  RESEARCH = 'Research & Publications',
  COMMUNITY_OUTREACH = 'Community Outreach',
  ADMINISTRATIVE_WORK = 'Administrative Work',
}

export interface ActivityLog {
  id: string;
  date: string; // YYYY-MM-DD
  category: ActivityCategory;
  description: string;
  effortLevel: number; // 1-4, for coloring the graph
}

export interface DentistProfile {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  bio: string;
  specializations: string[];
  certifications: string[];
  location: {
    city: string;
    country: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

export interface ProfileStats {
  totalContributions: number;
  longestStreak: number;
  currentStreak: number;
  points: number;
  level: number;
  levelName: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}
