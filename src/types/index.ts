export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Doctor extends User {
  specialization: string;
  licenseNumber: string;
  records: MedicalRecord[];
}

export interface Patient {
  id: string;
  email: string;
  name: string;
  dateOfBirth: Date;
  gender: string;
  createdAt?: Date;
  updatedAt?: Date;
  records: MedicalRecord[];
  phoneNumber?: string;
  address?: string;
  emergencyContact?: string;
  bloodType?: string;
  allergies?: string[];
  chronicConditions?: string[];
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  description: string;
  diagnosis: string;
  treatment: string;
  createdAt: Date;
  updatedAt?: Date;
  status?: string;
  followUpDate?: Date;
  attachments?: Attachment[];
  notes?: string;
  symptoms?: string[];
  medications?: Medication[];
  testResults?: TestResult[];
  patient?: Patient;
  doctor?: Doctor;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  uploadedAt: Date;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

export interface TestResult {
  name: string;
  result: string;
  date: Date;
  notes?: string;
}

export interface SearchFilters {
  name?: string;
  dateRange?: { from: Date; to: Date };
  doctor?: string;
  status?: string;
  gender?: string;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface SortState {
  field: string;
  direction: 'asc' | 'desc';
}