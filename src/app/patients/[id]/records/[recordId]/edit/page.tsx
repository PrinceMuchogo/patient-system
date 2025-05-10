"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { api } from "@/lib/api";
import { MedicalRecord } from "@/types";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/ui/PageHeader";
import RecordForm from "@/components/records/RecordForm";
import { MOCK_CURRENT_DOCTOR } from "@/data/mockData";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function EditRecordPage() {
  const params = useParams();
  const patientId = params.id as string;
  const recordId = params.recordId as string;
  
  const [record, setRecord] = useState<MedicalRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchRecord = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const recordData = await api.records.getById(recordId);
        
        if (!recordData) {
          setError("Record not found");
          return;
        }
        
        // Check if this record belongs to the current doctor
        if (recordData.doctorId !== MOCK_CURRENT_DOCTOR.id) {
          setError("You don't have permission to edit this record");
          return;
        }
        
        setRecord(recordData);
      } catch (err) {
        console.error("Error fetching record:", err);
        setError("Failed to load record information");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecord();
  }, [recordId]);
  
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }
  
  if (error || !record) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="text-muted-foreground mb-4">{error || "Record not found"}</p>
          <Link href={`/patients/${patientId}`}>
            <Button>Return to Patient</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Edit Medical Record"
          description="Update the medical record for this patient"
          action={
            <Link href={`/patients/${patientId}/records/${recordId}`}>
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Record
              </Button>
            </Link>
          }
        />
        
        <div className="mt-6">
          <RecordForm
            patientId={patientId}
            initialRecord={record}
            isEdit
          />
        </div>
      </div>
    </DashboardLayout>
  );
}