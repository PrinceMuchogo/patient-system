"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  User, 
  Phone, 
  Mail, 
  Home, 
  Heart, 
  AlertCircle, 
  Activity,
  Calendar
} from "lucide-react";
import { Patient, MedicalRecord } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  calculateAge, 
  formatDate, 
  getGenderLabel 
} from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface PatientHeaderProps {
  patient: Patient;
}

export default function PatientHeader({ patient }: PatientHeaderProps) {
  // Count active and follow-up records
  const activeRecords = patient.records.filter(
    (record) => record.status === "ACTIVE"
  ).length;
  
  const followUpRecords = patient.records.filter(
    (record) => record.status === "FOLLOW_UP"
  ).length;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{patient.name}</h2>
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(patient.dateOfBirth, "MMM d, yyyy")}
                    <span className="ml-1">({calculateAge(patient.dateOfBirth)} years)</span>
                  </span>
                  <span>•</span>
                  <span>{getGenderLabel(patient.gender)}</span>
                  <span>•</span>
                  <span>ID: {patient.id}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{patient.phoneNumber || "No phone number"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{patient.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{patient.address || "No address"}</span>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-sm">
                <Heart className="h-3 w-3" />
                <span>Blood: {patient.bloodType || "Unknown"}</span>
              </div>
              
              {patient.allergies && patient.allergies.length > 0 && (
                <div className="flex items-center gap-1 rounded-md bg-destructive/10 px-2 py-1 text-sm">
                  <AlertCircle className="h-3 w-3 text-destructive" />
                  <span>
                    Allergies: {patient.allergies.length > 2 
                      ? `${patient.allergies.slice(0, 2).join(", ")} +${patient.allergies.length - 2}` 
                      : patient.allergies.join(", ")}
                  </span>
                </div>
              )}
              
              {patient.chronicConditions && patient.chronicConditions.length > 0 && (
                <div className="flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-1 text-sm">
                  <Activity className="h-3 w-3 text-amber-500" />
                  <span>
                    Conditions: {patient.chronicConditions.length > 2 
                      ? `${patient.chronicConditions.slice(0, 2).join(", ")} +${patient.chronicConditions.length - 2}` 
                      : patient.chronicConditions.join(", ")}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col gap-3 justify-end sm:flex-row md:flex-col">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">View Full Profile</Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Patient Profile</SheetTitle>
                  <SheetDescription>
                    Complete information about {patient.name}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Full Name</p>
                        <p className="font-medium">{patient.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Date of Birth</p>
                        <p className="font-medium">{formatDate(patient.dateOfBirth, "MMM d, yyyy")}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Age</p>
                        <p className="font-medium">{calculateAge(patient.dateOfBirth)} years</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Gender</p>
                        <p className="font-medium">{getGenderLabel(patient.gender)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="font-medium">{patient.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <p className="font-medium">{patient.phoneNumber || "N/A"}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-muted-foreground">Address</p>
                        <p className="font-medium">{patient.address || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Medical Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Blood Type</p>
                        <p className="font-medium">{patient.bloodType || "Unknown"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Patient ID</p>
                        <p className="font-medium">{patient.id}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-xs text-muted-foreground mb-1">Allergies</p>
                      <div className="flex flex-wrap gap-2">
                        {patient.allergies && patient.allergies.length > 0 ? (
                          patient.allergies.map((allergy, index) => (
                            <Badge key={index} variant="secondary">{allergy}</Badge>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No known allergies</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-xs text-muted-foreground mb-1">Chronic Conditions</p>
                      <div className="flex flex-wrap gap-2">
                        {patient.chronicConditions && patient.chronicConditions.length > 0 ? (
                          patient.chronicConditions.map((condition, index) => (
                            <Badge key={index} variant="secondary">{condition}</Badge>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No chronic conditions</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Record Summary</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-md bg-muted p-3 text-center">
                        <p className="text-2xl font-bold">{patient.records.length}</p>
                        <p className="text-xs text-muted-foreground">Total Records</p>
                      </div>
                      <div className="rounded-md bg-blue-100 dark:bg-blue-950 p-3 text-center">
                        <p className="text-2xl font-bold">{activeRecords}</p>
                        <p className="text-xs text-muted-foreground">Active</p>
                      </div>
                      <div className="rounded-md bg-amber-100 dark:bg-amber-950 p-3 text-center">
                        <p className="text-2xl font-bold">{followUpRecords}</p>
                        <p className="text-xs text-muted-foreground">Follow-ups</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <Link href={`/patients/${patient.id}/records/new`}>
              <Button className="w-full">Create New Record</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}