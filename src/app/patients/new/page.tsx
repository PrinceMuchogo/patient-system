"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Patient } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar1 } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Save, X, Plus } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function NewPatientPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [patient, setPatient] = useState<Partial<Patient>>({
    name: "",
    email: "",
    dateOfBirth: new Date(),
    gender: "MALE",
    phoneNumber: "",
    address: "",
    bloodType: "",
    allergies: [],
    chronicConditions: [],
    emergencyContact: "",
  });
  
  // Temporary state for adding items
  const [newAllergy, setNewAllergy] = useState("");
  const [newCondition, setNewCondition] = useState("");
  
  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle date of birth change
  const handleDateOfBirthChange = (date: Date | undefined) => {
    if (date) {
      setPatient((prev) => ({ ...prev, dateOfBirth: date }));
    }
  };
  
  // Handle gender change
  const handleGenderChange = (value: string) => {
    setPatient((prev) => ({ ...prev, gender: value as "MALE" | "FEMALE" | "OTHER" }));
  };
  
  // Handle blood type change
  const handleBloodTypeChange = (value: string) => {
    setPatient((prev) => ({ ...prev, bloodType: value }));
  };
  
  // Add allergy
  const addAllergy = () => {
    if (!newAllergy.trim()) return;
    
    setPatient((prev) => ({
      ...prev,
      allergies: [...(prev.allergies || []), newAllergy.trim()],
    }));
    
    setNewAllergy("");
  };
  
  // Remove allergy
  const removeAllergy = (index: number) => {
    setPatient((prev) => ({
      ...prev,
      allergies: (prev.allergies || []).filter((_, i) => i !== index),
    }));
  };
  
  // Add chronic condition
  const addCondition = () => {
    if (!newCondition.trim()) return;
    
    setPatient((prev) => ({
      ...prev,
      chronicConditions: [...(prev.chronicConditions || []), newCondition.trim()],
    }));
    
    setNewCondition("");
  };
  
  // Remove chronic condition
  const removeCondition = (index: number) => {
    setPatient((prev) => ({
      ...prev,
      chronicConditions: (prev.chronicConditions || []).filter((_, i) => i !== index),
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!patient.name || !patient.email || !patient.dateOfBirth || !patient.gender) {
    //   toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create new patient
    //   await api.patients.create(patient);
    //   toast.success("Patient created successfully");
      
      // Navigate to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating patient:", error);
    //   toast.error("Failed to create patient");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="New Patient"
          description="Add a new patient to the system"
          action={
            <Link href="/dashboard">
              <Button variant="outline" className="gap-2">
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </Link>
          }
        />
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="name">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={patient.name}
                onChange={handleChange}
                placeholder="Enter patient's full name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={patient.email}
                onChange={handleChange}
                placeholder="Enter patient's email"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="dateOfBirth">
                Date of Birth <span className="text-destructive">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="dateOfBirth"
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {patient.dateOfBirth ? (
                      format(patient.dateOfBirth, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar1
                    mode="single"
                    selected={patient.dateOfBirth}
                    onSelect={handleDateOfBirthChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label htmlFor="gender">
                Gender <span className="text-destructive">*</span>
              </Label>
              <Select
                value={patient.gender}
                onValueChange={handleGenderChange}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={patient.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>
            
            <div>
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                name="emergencyContact"
                value={patient.emergencyContact}
                onChange={handleChange}
                placeholder="Name and phone number"
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                value={patient.address}
                onChange={handleChange}
                placeholder="Enter full address"
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="bloodType">Blood Type</Label>
            <Select
              value={patient.bloodType}
              onValueChange={handleBloodTypeChange}
            >
              <SelectTrigger id="bloodType" className="w-[200px]">
                <SelectValue placeholder="Select blood type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A-">A-</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B-">B-</SelectItem>
                <SelectItem value="AB+">AB+</SelectItem>
                <SelectItem value="AB-">AB-</SelectItem>
                <SelectItem value="O+">O+</SelectItem>
                <SelectItem value="O-">O-</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Allergies</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                placeholder="Add an allergy"
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addAllergy();
                  }
                }}
              />
              <Button type="button" onClick={addAllergy} variant="secondary">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {patient.allergies && patient.allergies.length > 0 ? (
                patient.allergies.map((allergy, index) => (
                  <Badge key={index} variant="secondary" className="gap-1 py-1.5">
                    {allergy}
                    <button
                      type="button"
                      onClick={() => removeAllergy(index)}
                      className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {allergy}</span>
                    </button>
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No allergies added</p>
              )}
            </div>
          </div>
          
          <div>
            <Label>Chronic Conditions</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                placeholder="Add a chronic condition"
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCondition();
                  }
                }}
              />
              <Button type="button" onClick={addCondition} variant="secondary">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {patient.chronicConditions && patient.chronicConditions.length > 0 ? (
                patient.chronicConditions.map((condition, index) => (
                  <Badge key={index} variant="secondary" className="gap-1 py-1.5">
                    {condition}
                    <button
                      type="button"
                      onClick={() => removeCondition(index)}
                      className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {condition}</span>
                    </button>
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No chronic conditions added</p>
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Create Patient
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}