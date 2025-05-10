"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { Patient } from "@/types";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/ui/PageHeader";
import PatientHeader from "@/components/patients/PatientHeader";
import MedicalRecordsList from "@/components/patients/MedicalRecordsList";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PatientDetailsPage() {
  const params = useParams();
  const patientId = params.id as string;
  
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPatient = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const patientData = await api.patients.getById(patientId);
        
        if (!patientData) {
          setError("Patient not found");
          return;
        }
        
        setPatient(patientData);
      } catch (err) {
        console.error("Error fetching patient:", err);
        setError("Failed to load patient information");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPatient();
  }, [patientId]);
  
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }
  
  if (error || !patient) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="text-muted-foreground mb-4">{error || "Patient not found"}</p>
          <Link href="/dashboard">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Patient Details"
          description="View and manage patient information"
          action={
            <Link href="/dashboard">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          }
        />
        
        <PatientHeader patient={patient} />
        
        <div className="mt-8">
          <MedicalRecordsList records={patient.records} />
        </div>
      </div>
    </DashboardLayout>
  );
}