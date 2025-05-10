"use client";

import Link from "next/link";
import { useState } from "react";
import { FileText, ChevronDown, ChevronUp, Edit, Clock, AlertCircle } from "lucide-react";
import { MedicalRecord } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatTimeAgo, getStatusColor } from "@/lib/utils";
import { MOCK_CURRENT_DOCTOR } from "@/data/mockData";

interface MedicalRecordCardProps {
  record: MedicalRecord;
  isCurrentDoctor?: boolean;
}

export default function MedicalRecordCard({
  record,
  isCurrentDoctor = false,
}: MedicalRecordCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  // Check if this record was created by the currently logged-in doctor
  const isByCurrentDoctor = record.doctorId === MOCK_CURRENT_DOCTOR.id;
  
  // Determine status and apply corresponding style
  const statusColor = getStatusColor(record.status);
  
  return (
    <Card className={`${isByCurrentDoctor ? 'border-primary/40' : ''}`}>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-md ${isByCurrentDoctor ? 'bg-primary/10' : 'bg-muted'}`}>
                <FileText className={`h-4 w-4 ${isByCurrentDoctor ? 'text-primary' : ''}`} />
              </div>
              <div>
                <h3 className="font-medium">{record.description}</h3>
                <p className="text-sm text-muted-foreground">
                  {record.doctor?.name || "Unknown doctor"} • {formatDate(record.createdAt, "MMM d, yyyy")}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <Badge className={statusColor}>{record.status}</Badge>
              
              {record.followUpDate && (
                <div className="flex items-center gap-1 text-xs">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span>Follow-up: {formatDate(record.followUpDate, "MMM d, yyyy")}</span>
                </div>
              )}
            </div>
          </div>
          
          {expanded && (
            <div className="mt-4 space-y-4 animate-in fade-in-50 slide-in-from-top-5 duration-300">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium mb-1">Diagnosis</h4>
                  <p className="text-sm">{record.diagnosis}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Treatment</h4>
                  <p className="text-sm">{record.treatment}</p>
                </div>
              </div>
              
              {record.symptoms && record.symptoms.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Symptoms</h4>
                  <div className="flex flex-wrap gap-1">
                    {record.symptoms.map((symptom, index) => (
                      <Badge key={index} variant="outline">{symptom}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {record.medications && record.medications.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Medications</h4>
                  <div className="space-y-2">
                    {record.medications.map((medication, index) => (
                      <div key={index} className="rounded-md bg-muted p-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{medication.name}</span>
                          <span>{medication.dosage}</span>
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          <span>{medication.frequency}</span>
                          {medication.duration && <span> • {medication.duration}</span>}
                          {medication.notes && (
                            <div className="mt-1 flex items-start gap-1">
                              <AlertCircle className="h-3 w-3 mt-0.5" />
                              <span>{medication.notes}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {record.testResults && record.testResults.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Test Results</h4>
                  <div className="space-y-2">
                    {record.testResults.map((test, index) => (
                      <div key={index} className="rounded-md bg-muted p-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{test.name}</span>
                          <span>{formatDate(test.date, "MMM d, yyyy")}</span>
                        </div>
                        <p className="mt-1">{test.result}</p>
                        {test.notes && <p className="mt-1 text-xs text-muted-foreground">{test.notes}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {record.notes && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Additional Notes</h4>
                  <p className="text-sm whitespace-pre-line">{record.notes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="gap-1"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              Show More
            </>
          )}
        </Button>
        
        <div className="flex gap-2">
          <Link href={`/patients/${record.patientId}/records/${record.id}`}>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
          
          {isByCurrentDoctor && (
            <Link href={`/patients/${record.patientId}/records/${record.id}/edit`}>
              <Button size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}