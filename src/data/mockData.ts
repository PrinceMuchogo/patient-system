import { Doctor, MedicalRecord, Patient } from "@/types";

export const MOCK_PATIENTS: Patient[] = [
  {
    id: "p1",
    name: "Godknows Aresho",
    email: "aresho@example.com",
    dateOfBirth: new Date("1990-01-01"),
    gender: "MALE",
    phoneNumber: "+263 123-4567",
    address: "123 Main Harae",
    bloodType: "O+",
    allergies: ["Penicillin", "Peanuts"],
    chronicConditions: ["Hypertension"],
    records: []
  },
  {
    id: "p2",
    name: "Farirai Masocha",
    email: "masocha@example.com",
    dateOfBirth: new Date("1985-05-15"),
    gender: "MALE",
    phoneNumber: "+263 987-6543",
    address: "456 Harae",
    bloodType: "A-",
    allergies: ["Sulfa drugs"],
    chronicConditions: ["Asthma", "Diabetes"],
    records: []
  },
  {
    id: "p3",
    name: "Prince Muchogo",
    email: "prince@example.com",
    dateOfBirth: new Date("1992-09-23"),
    gender: "MALE",
    phoneNumber: "+263 345-6789",
    address: "789 Baines",
    bloodType: "B+",
    allergies: [],
    chronicConditions: ["Migraine"],
    records: []
  },
  {
    id: "p4",
    name: "Tinotenda Jecha",
    email: "Jecha@example.com",
    dateOfBirth: new Date("1978-11-30"),
    gender: "MALE",
    phoneNumber: "+263 567-8901",
    address: "101 Chitungwiza",
    bloodType: "AB+",
    allergies: ["Latex", "Shellfish"],
    chronicConditions: ["Arthritis"],
    records: []
  },
  {
    id: "p5",
    name: "Sarah Muda",
    email: "muda@example.com",
    dateOfBirth: new Date("1995-03-12"),
    gender: "FEMALE",
    phoneNumber: "+263 234-5678",
    address: "222 Mount",
    bloodType: "O-",
    allergies: ["Ibuprofen"],
    chronicConditions: [],
    records: []
  },
  {
    id: "p6",
    name: "David Masocha",
    email: "masocha@example.com",
    dateOfBirth: new Date("1982-07-19"),
    gender: "MALE",
    phoneNumber: "+263 876-5432",
    address: "333 Marondera",
    bloodType: "A+",
    allergies: [],
    chronicConditions: ["Hyperthyroidism"],
    records: []
  },
  {
    id: "p7",
    name: "Lisa Murehwa",
    email: "lisa@example.com",
    dateOfBirth: new Date("1989-12-05"),
    gender: "FEMALE",
    phoneNumber: "+263 432-1098",
    address: "444 Murehwa",
    bloodType: "B-",
    allergies: ["Dairy"],
    chronicConditions: ["Depression", "Anxiety"],
    records: []
  },
  {
    id: "p8",
    name: "Robert Mega",
    email: "robert@example.com",
    dateOfBirth: new Date("1973-04-27"),
    gender: "MALE",
    phoneNumber: "+263 321-6547",
    address: "555 Matopo",
    bloodType: "AB-",
    allergies: ["Pollen", "Dust mites"],
    chronicConditions: ["COPD"],
    records: []
  }
];

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Elizabeth Wilson",
    email: "dr.wilson@example.com",
    role: "DOCTOR",
    specialization: "Cardiology",
    licenseNumber: "MD12345",
    createdAt: new Date("2020-01-15"),
    updatedAt: new Date("2023-05-20"),
    records: []
  },
  {
    id: "d2",
    name: "Dr. James Muchogo",
    email: "dr.muchogo@example.com",
    role: "DOCTOR",
    specialization: "Neurology",
    licenseNumber: "MD67890",
    createdAt: new Date("2019-03-22"),
    updatedAt: new Date("2023-06-10"),
    records: []
  },
  {
    id: "d3",
    name: "Dr. Sarah Chenai",
    email: "dr.chen@example.com",
    role: "DOCTOR",
    specialization: "Pediatrics",
    licenseNumber: "MD24680",
    createdAt: new Date("2021-07-05"),
    updatedAt: new Date("2023-04-15"),
    records: []
  }
];

export const MOCK_RECORDS: MedicalRecord[] = [
  {
    id: "r1",
    patientId: "p1",
    doctorId: "d1",
    description: "Regular checkup",
    diagnosis: "Healthy, slight elevation in blood pressure",
    treatment: "Recommended dietary changes and regular exercise",
    createdAt: new Date("2023-01-15"),
    status: "RESOLVED",
    symptoms: ["Fatigue", "Occasional headaches"],
    medications: [
      {
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "30 days",
        notes: "Take in the morning"
      }
    ]
  },
  {
    id: "r2",
    patientId: "p1",
    doctorId: "d2",
    description: "Neurological consultation",
    diagnosis: "Tension headaches",
    treatment: "Stress management techniques and pain relievers as needed",
    createdAt: new Date("2023-03-22"),
    status: "RESOLVED",
    symptoms: ["Frequent headaches", "Neck stiffness"],
    medications: [
      {
        name: "Ibuprofen",
        dosage: "400mg",
        frequency: "As needed for pain",
        duration: "PRN",
        notes: "Do not exceed 1200mg in 24 hours"
      }
    ]
  },
  {
    id: "r3",
    patientId: "p1",
    doctorId: "d1",
    description: "Follow-up for blood pressure",
    diagnosis: "Hypertension, Stage 1",
    treatment: "Continued medication and lifestyle modifications",
    createdAt: new Date("2023-07-10"),
    status: "ACTIVE",
    followUpDate: new Date("2023-10-10"),
    symptoms: ["Occasional dizziness"],
    medications: [
      {
        name: "Lisinopril",
        dosage: "20mg",
        frequency: "Once daily",
        duration: "90 days",
        notes: "Increased from previous dosage"
      }
    ],
    testResults: [
      {
        name: "Blood Pressure",
        result: "140/90 mmHg",
        date: new Date("2023-07-10"),
        notes: "Measured after 10 minutes of rest"
      },
      {
        name: "Heart Rate",
        result: "78 bpm",
        date: new Date("2023-07-10"),
        notes: "Regular rhythm"
      }
    ]
  },
  {
    id: "r4",
    patientId: "p2",
    doctorId: "d3",
    description: "Annual physical examination",
    diagnosis: "Healthy, well-controlled asthma",
    treatment: "Continue current medications",
    createdAt: new Date("2023-02-18"),
    status: "RESOLVED",
    symptoms: ["Occasional shortness of breath with exercise"],
    medications: [
      {
        name: "Albuterol",
        dosage: "2 puffs",
        frequency: "As needed for shortness of breath",
        duration: "PRN",
        notes: "Use before exercise if needed"
      },
      {
        name: "Fluticasone",
        dosage: "1 puff",
        frequency: "Twice daily",
        duration: "Ongoing",
        notes: "Rinse mouth after use"
      }
    ]
  },
  {
    id: "r5",
    patientId: "p2",
    doctorId: "d1",
    description: "Cardiology consultation",
    diagnosis: "Mild mitral valve prolapse, not clinically significant",
    treatment: "No specific treatment needed, annual follow-up",
    createdAt: new Date("2023-05-03"),
    status: "RESOLVED",
    followUpDate: new Date("2024-05-03"),
    testResults: [
      {
        name: "Echocardiogram",
        result: "Mild mitral valve prolapse without regurgitation",
        date: new Date("2023-05-03"),
        notes: "No intervention required at this time"
      },
      {
        name: "ECG",
        result: "Normal sinus rhythm",
        date: new Date("2023-05-03"),
        notes: "No arrhythmias detected"
      }
    ]
  },
  {
    id: "r6",
    patientId: "p3",
    doctorId: "d2",
    description: "Migraine evaluation",
    diagnosis: "Chronic migraine with aura",
    treatment: "Preventive medication and lifestyle modifications",
    createdAt: new Date("2023-04-12"),
    status: "ACTIVE",
    followUpDate: new Date("2023-07-12"),
    symptoms: ["Severe headaches with visual disturbances", "Nausea"],
    medications: [
      {
        name: "Topiramate",
        dosage: "50mg",
        frequency: "Once daily",
        duration: "90 days",
        notes: "Take at bedtime"
      },
      {
        name: "Sumatriptan",
        dosage: "50mg",
        frequency: "As needed for migraine attacks",
        duration: "PRN",
        notes: "Max 200mg in 24 hours"
      }
    ]
  },
  {
    id: "r7",
    patientId: "p4",
    doctorId: "d1",
    description: "Arthritis follow-up",
    diagnosis: "Osteoarthritis, moderate severity",
    treatment: "Physical therapy and pain management",
    createdAt: new Date("2023-06-28"),
    status: "ACTIVE",
    followUpDate: new Date("2023-09-28"),
    symptoms: ["Joint pain", "Morning stiffness", "Reduced range of motion"],
    medications: [
      {
        name: "Meloxicam",
        dosage: "15mg",
        frequency: "Once daily",
        duration: "30 days",
        notes: "Take with food"
      },
      {
        name: "Acetaminophen",
        dosage: "500mg",
        frequency: "As needed for breakthrough pain",
        duration: "PRN",
        notes: "Do not exceed 3000mg in 24 hours"
      }
    ]
  },
  {
    id: "r8",
    patientId: "p5",
    doctorId: "d3",
    description: "Preventive care visit",
    diagnosis: "Healthy",
    treatment: "Routine vaccinations updated",
    createdAt: new Date("2023-03-30"),
    status: "RESOLVED",
    testResults: [
      {
        name: "Complete Blood Count",
        result: "Within normal limits",
        date: new Date("2023-03-30"),
        notes: ""
      },
      {
        name: "Lipid Panel",
        result: "Total cholesterol: 185 mg/dL, HDL: 55 mg/dL, LDL: 110 mg/dL, Triglycerides: 100 mg/dL",
        date: new Date("2023-03-30"),
        notes: "All values within normal range"
      }
    ]
  }
];

// Enriched data with associations
export const getEnrichedRecords = (): MedicalRecord[] => {
  return MOCK_RECORDS.map(record => {
    const patient = MOCK_PATIENTS.find(p => p.id === record.patientId);
    const doctor = MOCK_DOCTORS.find(d => d.id === record.doctorId);
    return {
      ...record,
      patient,
      doctor
    };
  });
};

export const getEnrichedPatients = (): Patient[] => {
  return MOCK_PATIENTS.map(patient => {
    const patientRecords = MOCK_RECORDS.filter(record => record.patientId === patient.id);
    return {
      ...patient,
      records: patientRecords
    };
  });
};

export const MOCK_CURRENT_DOCTOR: Doctor = {
  ...MOCK_DOCTORS[0],
  records: MOCK_RECORDS.filter(record => record.doctorId === MOCK_DOCTORS[0].id)
};

// Utility functions to simulate API calls
export const getPatients = async (search?: string, page = 1, pageSize = 10): Promise<{
  patients: Patient[];
  total: number;
}> => {
  let filteredPatients = [...MOCK_PATIENTS];
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredPatients = filteredPatients.filter(
      p => p.name.toLowerCase().includes(searchLower) || 
           p.email.toLowerCase().includes(searchLower)
    );
  }
  
  const total = filteredPatients.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedPatients = filteredPatients.slice(start, end);
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        patients: paginatedPatients,
        total
      });
    }, 500); // Simulate network delay
  });
};

export const getPatientById = async (id: string): Promise<Patient | null> => {
  const patient = MOCK_PATIENTS.find(p => p.id === id);
  
  if (!patient) return Promise.resolve(null);
  
  const patientRecords = MOCK_RECORDS.filter(record => record.patientId === id);
  const enrichedPatient = {
    ...patient,
    records: patientRecords
  };
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(enrichedPatient);
    }, 500);
  });
};

export const getRecordById = async (id: string): Promise<MedicalRecord | null> => {
  const record = MOCK_RECORDS.find(r => r.id === id);
  
  if (!record) return Promise.resolve(null);
  
  const patient = MOCK_PATIENTS.find(p => p.id === record.patientId);
  const doctor = MOCK_DOCTORS.find(d => d.id === record.doctorId);
  
  const enrichedRecord = {
    ...record,
    patient,
    doctor
  };
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(enrichedRecord);
    }, 500);
  });
};

export const createRecord = async (record: Partial<MedicalRecord>): Promise<MedicalRecord> => {
  const newRecord: MedicalRecord = {
    id: `r${MOCK_RECORDS.length + 1}`,
    patientId: record.patientId || '',
    doctorId: record.doctorId || MOCK_CURRENT_DOCTOR.id,
    description: record.description || '',
    diagnosis: record.diagnosis || '',
    treatment: record.treatment || '',
    createdAt: new Date(),
    status: record.status || 'ACTIVE',
    symptoms: record.symptoms || [],
    medications: record.medications || [],
    testResults: record.testResults || []
  };
  
  // In a real implementation, this would add to the database
  // Here we're just simulating the response
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(newRecord);
    }, 500);
  });
};

export const updateRecord = async (id: string, updates: Partial<MedicalRecord>): Promise<MedicalRecord | null> => {
  const recordIndex = MOCK_RECORDS.findIndex(r => r.id === id);
  
  if (recordIndex === -1) return Promise.resolve(null);
  
  // In a real implementation, this would update the database
  // Here we're just simulating the response
  const updatedRecord = {
    ...MOCK_RECORDS[recordIndex],
    ...updates,
    updatedAt: new Date()
  };
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(updatedRecord);
    }, 500);
  });
};