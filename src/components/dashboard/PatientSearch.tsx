"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { debounce } from "@/lib/utils";

interface PatientSearchProps {
  onSearch: (searchTerm: string) => void;
  onFilterChange?: (filters: { 
    doctor?: string;
    dateRange?: string;
    status?: string;
    gender?: string;
  }) => void;
}

export default function PatientSearch({ onSearch, onFilterChange }: PatientSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showClearButton, setShowClearButton] = useState(false);
  const [filters, setFilters] = useState({
    doctor: "",
    dateRange: "",
    status: "",
    gender: "",
  });

  // Create debounced search function
  const debouncedSearch = debounce((value: string) => {
    onSearch(value);
  }, 300);

  // Handle input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowClearButton(value.length > 0);
    debouncedSearch(value);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm("");
    setShowClearButton(false);
    onSearch("");
  };

  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search patients..."
          className="pl-8 pr-10"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {showClearButton && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Filters</Button>
          </PopoverTrigger>
          <PopoverContent className="w-72" align="end">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Filter by</h4>
                <div className="grid gap-3">
                  <div className="grid grid-cols-4 items-center gap-2">
                    <label htmlFor="doctor" className="text-sm col-span-1">
                      Doctor
                    </label>
                    <Select 
                      value={filters.doctor} 
                      onValueChange={(value:any) => handleFilterChange("doctor", value)}
                    >
                      <SelectTrigger id="doctor" className="col-span-3">
                        <SelectValue placeholder="All doctors" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All doctors</SelectItem>
                        <SelectItem value="d1">Dr. Elizabeth Wilson</SelectItem>
                        <SelectItem value="d2">Dr. James Rodriguez</SelectItem>
                        <SelectItem value="d3">Dr. Sarah Chen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-2">
                    <label htmlFor="dateRange" className="text-sm col-span-1">
                      Date
                    </label>
                    <Select 
                      value={filters.dateRange} 
                      onValueChange={(value: any) => handleFilterChange("dateRange", value)}
                    >
                      <SelectTrigger id="dateRange" className="col-span-3">
                        <SelectValue placeholder="Any time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any time</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">This week</SelectItem>
                        <SelectItem value="month">This month</SelectItem>
                        <SelectItem value="year">This year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-2">
                    <label htmlFor="status" className="text-sm col-span-1">
                      Status
                    </label>
                    <Select 
                      value={filters.status} 
                      onValueChange={(value: any) => handleFilterChange("status", value)}
                    >
                      <SelectTrigger id="status" className="col-span-3">
                        <SelectValue placeholder="Any status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any status</SelectItem>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="RESOLVED">Resolved</SelectItem>
                        <SelectItem value="FOLLOW_UP">Follow-up</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-2">
                    <label htmlFor="gender" className="text-sm col-span-1">
                      Gender
                    </label>
                    <Select 
                      value={filters.gender} 
                      onValueChange={(value: any) => handleFilterChange("gender", value)}
                    >
                      <SelectTrigger id="gender" className="col-span-3">
                        <SelectValue placeholder="Any gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any gender</SelectItem>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    const resetFilters = {
                      doctor: "",
                      dateRange: "",
                      status: "",
                      gender: "",
                    };
                    setFilters(resetFilters);
                    if (onFilterChange) {
                      onFilterChange(resetFilters);
                    }
                  }}
                >
                  Reset
                </Button>
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    if (onFilterChange) {
                      onFilterChange(filters);
                    }
                  }}
                >
                  Apply
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}