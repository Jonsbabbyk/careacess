export type ThemeMode = 'light' | 'dark' | 'high-contrast';

export interface Location {
  id: string;
  name: string;
  address: string;
  category: string;
  accessible: boolean;
  coordinates: [number, number]; // [latitude, longitude]
  features: string[];
  description?: string;
}

export interface InaccessibleReport {
  id?: string;
  locationName: string;
  address: string;
  issue: string;
  contactName?: string;
  contactEmail?: string;
  dateReported?: string;
  coordinates?: [number, number];
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface HealthIssueReport {
  id?: string;
  facilityName: string;
  issueCategory: 'Access' | 'Communication' | 'Transport' | 'Other';
  description: string;
  healthIssue?: string;
  contactName?: string;
  contactEmail?: string;
  dateReported?: string;
}