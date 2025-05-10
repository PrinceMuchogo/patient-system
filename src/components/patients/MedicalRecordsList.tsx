"use client";

import { useState } from "react";
import { ArrowDownAZ, ArrowUpAZ, Filter } from "lucide-react";
import { MedicalRecord } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MedicalRecordCard from "./MedicalRecordCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MOCK_CURRENT_DOCTOR } from "@/data/mockData";
import EmptyState from "../ui/EmptyState";

interface MedicalRecordsListProps {
  records: MedicalRecord[];
}

export default function MedicalRecordsList({
  records,
}: MedicalRecordsListProps) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [doctorFilter, setDoctorFilter] = useState<string | undefined>(undefined);
  
  // Filter records
  let filteredRecords = [...records];
  
  if (statusFilter) {
    filteredRecords = filteredRecords.filter(record => record.status === statusFilter);
  }
  
  if (doctorFilter) {
    filteredRecords = filteredRecords.filter(record => record.doctorId === doctorFilter);
  }
  
  // Sort records by date
  filteredRecords.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });
  
  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };
  
  if (records.length === 0) {
    return (
      <EmptyState 
        title="No medical records found"
        description="This patient doesn't have any medical records yet."
      />
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Medical Records</h2>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSortOrder}
            className="gap-2"
          >
            {sortOrder === "desc" ? (
              <>
                <ArrowDownAZ className="h-4 w-4" />
                Newest first
              </>
            ) : (
              <>
                <ArrowUpAZ className="h-4 w-4" />
                Oldest first
              </>
            )}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter Records</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                Status
              </DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={statusFilter}
                onValueChange={(value: any) => setStatusFilter(value || undefined)}
              >
                <DropdownMenuRadioItem value="">All statuses</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="ACTIVE">Active</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="RESOLVED">Resolved</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="FOLLOW_UP">Follow-up</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                Doctor
              </DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={doctorFilter}
                onValueChange={(value: any) => setDoctorFilter(value || undefined)}
              >
                <DropdownMenuRadioItem value="">All doctors</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={MOCK_CURRENT_DOCTOR.id}>
                  My records
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="other">
                  Other doctors
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <MedicalRecordCard
              key={record.id}
              record={record}
              isCurrentDoctor={record.doctorId === MOCK_CURRENT_DOCTOR.id}
            />
          ))
        ) : (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground">No records match your filters.</p>
            <Button
              variant="link"
              className="mt-2"
              onClick={() => {
                setStatusFilter(undefined);
                setDoctorFilter(undefined);
              }}
            >
              Clear filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}