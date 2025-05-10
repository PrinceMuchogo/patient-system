"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Users, FileText } from "lucide-react";
import { api } from "@/lib/api";
import { Patient } from "@/types";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/ui/PageHeader";
import PatientSearch from "@/components/dashboard/PatientSearch";
import PatientList from "@/components/dashboard/PatientList";
import StatisticsCards from "@/components/dashboard/StatisticsCard";
import { MOCK_RECORDS } from "@/data/mockData";

export default function DashboardPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState<{
    field: keyof Patient;
    direction: "asc" | "desc";
  }>({ field: "name", direction: "asc" });
  const [filters, setFilters] = useState({
    doctor: "",
    dateRange: "",
    status: "",
    gender: "",
  });
  
  // Calculate statistics
  const activeRecords = MOCK_RECORDS.filter(r => r.status === 'ACTIVE').length;
  const followUps = MOCK_RECORDS.filter(r => r.followUpDate).length;

  const fetchPatients = async () => {
    setIsLoading(true);
    try {
      const response = await api.patients.getAll(page, pageSize, searchTerm);
      setPatients(response.patients);
      setTotal(response.total);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [page, searchTerm]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPage(1); // Reset to first page on new search
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page on filter change
    
    // In a real application, we would apply these filters to the API call
    // For our demo, we'll just log them
    console.log("Filters applied:", newFilters);
  };

  const handleSortChange = (field: keyof Patient, direction: "asc" | "desc") => {
    setSort({ field, direction });
    
    // In a real application, we would apply this sort to the API call
    // For our demo, we'll just log it
    console.log("Sort changed:", field, direction);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 text-black">
        <PageHeader
          title="Dashboard"
          description="Manage your patients and records"
          action={
            <Link href="/patients/new">
              <Button className="text-white">
                <User className="mr-2 h-4 w-4" />
                <span>New Patient</span>
              </Button>
            </Link>
          }
        />

        <StatisticsCards 
          totalPatients={total} 
          activeRecords={activeRecords}
          followUps={followUps} 
          pendingActions={3}
        />
        
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-4">Patients</h2>
          <PatientSearch 
            onSearch={handleSearch} 
            onFilterChange={handleFilterChange}
          />
          <PatientList 
            patients={patients}
            total={total}
            page={page}
            pageSize={pageSize}
            sort={sort}
            isLoading={isLoading}
            onPageChange={setPage}
            onSortChange={handleSortChange}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}