// WaveScan — 공통 타입 정의

export interface User {
  isLoggedIn: boolean;
  provider: 'google' | 'guest';
  name: string;
  email: string;
  avatar: string;
  loginTime?: string;
}

export interface ChecklistItem {
  name: string;
  status: 'pass' | 'fail' | 'warn';
  text: string;
}

export interface ScanData {
  id: string;
  date: string;
  timestamp: number;
  material: string;
  materialCode: string;
  grade: 'safe' | 'caution' | 'danger';
  gradeTitle: string;
  gradeDesc: string;
  maxTemp: number;
  bpaStatus: string;
  confidence: number;
  imageUrl: string;
  checklist: ChecklistItem[];
  aiComment: string;
}

export interface Stats {
  total: number;
  safe: number;
  caution: number;
  danger: number;
  accuracy: string;
}

export interface NotificationItem {
  id: string;
  type: 'scan' | 'guide' | 'notice' | 'danger';
  title: string;
  desc: string;
  time: string;
  read: boolean;
}

export interface NotifSettings {
  scanComplete: boolean;
  dangerAlert: boolean;
  guideUpdate: boolean;
  notice: boolean;
  marketing: boolean;
  masterOn: boolean;
}
