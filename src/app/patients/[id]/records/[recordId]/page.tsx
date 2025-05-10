"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { MedicalRecord } from "@/types";
import { ArrowLeft, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDate, getStatusColor } from "@/lib/utils";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/ui/PageHeader";
import { MOCK_CURRENT_DOCTOR } from "@/data/mockData";

export default function RecordDetailPage() {
  const params = useParams();
  const patientId = params.id as string;
  const recordId = params.recordId as string;
  
  const [record, setRecord] = useState<MedicalRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Check if this record was created by the current doctor
  const isByCurrentDoctor = record?.doctorId === MOCK_CURRENT_DOCTOR.id;
  
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
  
  const statusColor = getStatusColor(record.status);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Medical Record"
          description={record.description}
          action={
            <div className="flex gap-2">
              <Link href={`/patients/${patientId}`}>
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Patient
                </Button>
              </Link>
              
              {isByCurrentDoctor && (
                <Link href={`/patients/${patientId}/records/${recordId}/edit`}>
                  <Button className="gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Record
                  </Button>
                </Link>
              )}
            </div>
          }
        />
        
        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Record Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                  <p>{record.description}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Diagnosis</h3>
                  <p>{record.diagnosis}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Treatment</h3>
                  <p>{record.treatment}</p>
                </div>
                
                {record.notes && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Additional Notes</h3>
                    <p className="whitespace-pre-line">{record.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {record.symptoms && record.symptoms.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Symptoms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {record.symptoms.map((symptom, index) => (
                      <Badge key={index} variant="outline">{symptom}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {record.medications && record.medications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Medications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {record.medications.map((medication, index) => (
                      <div key={index} className="rounded-md bg-muted p-4">
                        <h4 className="font-medium">{medication.name}</h4>
                        <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Dosage</p>
                            <p>{medication.dosage}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Frequency</p>
                            <p>{medication.frequency}</p>
                          </div>
                          {medication.duration && (
                            <div>
                              <p className="text-xs text-muted-foreground">Duration</p>
                              <p>{medication.duration}</p>
                            </div>
                          )}
                        </div>
                        {medication.notes && (
                          <div className="mt-2">
                            <p className="text-xs text-muted-foreground">Notes</p>
                            <p>{medication.notes}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {record.testResults && record.testResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Test Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {record.testResults.map((test, index) => (
                      <div key={index} className="rounded-md bg-muted p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{test.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(test.date, "MMM d, yyyy")}
                          </p>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground">Result</p>
                          <p>{test.result}</p>
                        </div>
                        {test.notes && (
                          <div className="mt-2">
                            <p className="text-xs text-muted-foreground">Notes</p>
                            <p>{test.notes}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className={`${statusColor} text-md px-3 py-1`}>
                  {record.status}
                </Badge>
                
                {record.followUpDate && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Follow-up Date</h3>
                    <p>{formatDate(record.followUpDate, "PPP")}</p>
                  </div>
                )}
                
                <Separator className="my-4" />
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Created By</h3>
                  <p className="font-medium">{record.doctor?.name || "Unknown"}</p>
                  <p className="text-sm text-muted-foreground">
                    {record.doctor?.specialization || ""}
                  </p>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Patient</h3>
                  <p className="font-medium">{record.patient?.name}</p>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Record History</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm">Created</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(record.createdAt, "PP p")}
                      </p>
                    </div>
                    {record.updatedAt && (
                      <div className="flex justify-between">
                        <p className="text-sm">Last Updated</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(record.updatedAt, "PP p")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}