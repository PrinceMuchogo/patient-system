import { MedicalRecord, Patient, SearchFilters } from "@/types";
import { 
  getPatients, 
  getPatientById, 
  getRecordById, 
  createRecord, 
  updateRecord 
} from "@/data/mockData";

// API route definitions
export const API_ROUTES = {
  patients: {
    list: '/api/patients',
    search: '/api/patients/search',
    details: (id: string) => `/api/patients/${id}`,
    records: (id: string) => `/api/patients/${id}/records`,
  },
  records: {
    create: '/api/records',
    update: (id: string) => `/api/records/${id}`,
    delete: (id: string) => `/api/records/${id}`,
  }
};

// API client functions
export const api = {
  // Patient-related API calls
  patients: {
    getAll: async (
      page = 1, 
      pageSize = 10,
      search?: string
    ): Promise<{ patients: Patient[]; total: number }> => {
      // This would be an actual API call in production
      // For now we're using our mock data function
      return getPatients(search, page, pageSize);
    },
    
    search: async (
      filters: SearchFilters, 
      page = 1, 
      pageSize = 10
    ): Promise<{ patients: Patient[]; total: number }> => {
      // In a real API, we would send these filters to the backend
      // For our mock, we'll just use the name filter with our getPatients function
      return getPatients(filters.name, page, pageSize);
    },
    
    getById: async (id: string): Promise<Patient | null> => {
      return getPatientById(id);
    },
    
    getRecords: async (patientId: string): Promise<MedicalRecord[]> => {
      const patient = await getPatientById(patientId);
      return patient?.records || [];
    }
  },
  
  // Record-related API calls
  records: {
    getById: async (id: string): Promise<MedicalRecord | null> => {
      return getRecordById(id);
    },
    
    create: async (record: Partial<MedicalRecord>): Promise<MedicalRecord> => {
      return createRecord(record);
    },
    
    update: async (id: string, updates: Partial<MedicalRecord>): Promise<MedicalRecord | null> => {
      return updateRecord(id, updates);
    },
    
    delete: async (id: string): Promise<boolean> => {
      // In a real application, this would delete the record
      // For our mock, we'll just return success
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, 500);
      });
    }
  }
};