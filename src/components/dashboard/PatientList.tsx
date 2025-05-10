"use client";

import { useState } from "react";
import Link from "next/link";
import { Patient } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Eye,
  FileText,
  Plus,
} from "lucide-react";
import { 
  calculateAge, 
  formatDate, 
  getGenderLabel 
} from "@/lib/utils";
import { formatTimeAgo } from "@/lib/utils";

interface PatientListProps {
  patients: Patient[];
  total: number;
  page: number;
  pageSize: number;
  sort?: {
    field: keyof Patient;
    direction: "asc" | "desc";
  };
  isLoading?: boolean;
  onPageChange: (page: number) => void;
  onSortChange?: (field: keyof Patient, direction: "asc" | "desc") => void;
}

export default function PatientList({
  patients,
  total,
  page,
  pageSize,
  sort,
  isLoading = false,
  onPageChange,
  onSortChange,
}: PatientListProps) {
  const [sortField, setSortField] = useState<keyof Patient | null>(
    sort?.field || null
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    sort?.direction || "asc"
  );

  const totalPages = Math.ceil(total / pageSize);

  // Handle sorting
  const handleSort = (field: keyof Patient) => {
    const isCurrentSortField = sortField === field;
    const newDirection = isCurrentSortField && sortDirection === "asc" ? "desc" : "asc";
    
    setSortField(field);
    setSortDirection(newDirection);
    
    if (onSortChange) {
      onSortChange(field, newDirection);
    }
  };

  // Create sort button
  const SortButton = ({ field, label }: { field: keyof Patient; label: string }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 px-2 data-[state=sorted]:bg-accent data-[state=sorted]:text-accent-foreground"
      onClick={() => handleSort(field)}
      data-state={sortField === field ? "sorted" : "unsorted"}
    >
      {label}
      <ArrowUpDown
        className={`ml-2 h-4 w-4 ${
          sortField === field
            ? "opacity-100"
            : "opacity-50"
        }`}
      />
    </Button>
  );

//   if (isLoading) {
//     return (
//       <Card className="mt-6">
//         <div className="p-8 flex justify-center">
//           <LoadingSpinner size="lg" />
//         </div>
//       </Card>
//     );
//   }

  if (!patients.length) {
    return (
      <div>
        <Link href="/patients/new">
            <Button className="text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Patient
            </Button>
          </Link>
      </div>
    );
  }

  return (
    <Card className="mt-6">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <SortButton field="name" label="Name" />
              </TableHead>
              <TableHead>
                <SortButton field="gender" label="Gender" />
              </TableHead>
              <TableHead>
                <SortButton field="dateOfBirth" label="Age" />
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                >
                  Last Visit
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => {
              const lastRecord = patient.records && patient.records.length > 0
                ? patient.records.sort((a, b) => 
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                  )[0]
                : null;
                
              return (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">
                    <Link 
                      href={`/patients/${patient.id}`}
                      className="hover:underline focus:outline-none focus:underline"
                    >
                      {patient.name}
                    </Link>
                  </TableCell>
                  <TableCell>{getGenderLabel(patient.gender)}</TableCell>
                  <TableCell>
                    {calculateAge(patient.dateOfBirth)} 
                    <span className="text-muted-foreground ml-1 text-xs">
                      ({formatDate(patient.dateOfBirth, "MMM d, yyyy")})
                    </span>
                  </TableCell>
                  <TableCell>
                    {lastRecord ? (
                      <span className="flex flex-col">
                        <span>{formatTimeAgo(lastRecord.createdAt)}</span>
                        <span className="text-xs text-muted-foreground">
                          {lastRecord.doctor?.name || "Unknown doctor"}
                        </span>
                      </span>
                    ) : (
                      <span className="text-muted-foreground">No visits</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/patients/${patient.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                      </Link>
                      <Link href={`/patients/${patient.id}/records/new`}>
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">Add record</span>
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, total)} of {total} patients
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <div className="text-sm">
              Page {page} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}