"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MedicalRecord, Medication, TestResult } from "@/types";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Calendar1 } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  X, 
  Plus, 
  CalendarIcon, 
  Pill, 
  FileText,
  Save,
  Stethoscope,
  Activity,
  ClipboardCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { formatDate } from "@/lib/utils";
import { MOCK_CURRENT_DOCTOR } from "@/data/mockData";
import LoadingSpinner from "../ui/LoadingSpinner";

interface RecordFormProps {
  patientId: string;
  initialRecord?: MedicalRecord;
  isEdit?: boolean;
}

export default function RecordForm({
  patientId,
  initialRecord,
  isEdit = false,
}: RecordFormProps) {
  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [record, setRecord] = useState<Partial<MedicalRecord>>(
    initialRecord || {
      patientId,
      doctorId: MOCK_CURRENT_DOCTOR.id,
      description: "",
      diagnosis: "",
      treatment: "",
      status: "ACTIVE",
      symptoms: [],
      medications: [],
      testResults: [],
      notes: "",
    }
  );
  
  // Temporary state for adding items
  const [newSymptom, setNewSymptom] = useState("");
  const [newMedication, setNewMedication] = useState<Partial<Medication>>({
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
    notes: "",
  });
  const [newTestResult, setNewTestResult] = useState<Partial<TestResult>>({
    name: "",
    result: "",
    date: new Date(),
    notes: "",
  });
  
  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRecord((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle status change
  const handleStatusChange = (value: string) => {
    setRecord((prev) => ({ ...prev, status: value }));
  };
  
  // Handle follow-up date change
  const handleFollowUpDateChange = (date: Date | undefined) => {
    setRecord((prev) => ({ ...prev, followUpDate: date }));
  };
  
  // Add symptom
  const addSymptom = () => {
    if (!newSymptom.trim()) return;
    
    setRecord((prev) => ({
      ...prev,
      symptoms: [...(prev.symptoms || []), newSymptom.trim()],
    }));
    
    setNewSymptom("");
  };
  
  // Remove symptom
  const removeSymptom = (index: number) => {
    setRecord((prev) => ({
      ...prev,
      symptoms: (prev.symptoms || []).filter((_, i) => i !== index),
    }));
  };
  
  // Add medication
  const addMedication = () => {
    if (!newMedication.name || !newMedication.dosage || !newMedication.frequency) {
    //   toast.error("Please enter medication name, dosage, and frequency");
      return;
    }
    
    setRecord((prev) => ({
      ...prev,
      medications: [...(prev.medications || []), newMedication as Medication],
    }));
    
    setNewMedication({
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      notes: "",
    });
  };
  
  // Remove medication
  const removeMedication = (index: number) => {
    setRecord((prev) => ({
      ...prev,
      medications: (prev.medications || []).filter((_, i) => i !== index),
    }));
  };
  
  // Add test result
  const addTestResult = () => {
    if (!newTestResult.name || !newTestResult.result) {
    //   toast.error("Please enter test name and result");
      return;
    }
    
    setRecord((prev) => ({
      ...prev,
      testResults: [...(prev.testResults || []), newTestResult as TestResult],
    }));
    
    setNewTestResult({
      name: "",
      result: "",
      date: new Date(),
      notes: "",
    });
  };
  
  // Remove test result
  const removeTestResult = (index: number) => {
    setRecord((prev) => ({
      ...prev,
      testResults: (prev.testResults || []).filter((_, i) => i !== index),
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!record.description || !record.diagnosis || !record.treatment) {
    //   toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (isEdit && initialRecord?.id) {
        // Update existing record
        await api.records.update(initialRecord.id, record);
        // toast.success("Medical record updated successfully");
      } else {
        // Create new record
        await api.records.create(record);
        // toast.success("Medical record created successfully");
      }
      
      // Navigate back to patient detail page
      router.push(`/patients/${patientId}`);
    } catch (error) {
      console.error("Error saving record:", error);
    //   toast.error("Failed to save medical record");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="description" className="flex items-center gap-2 mb-2">
            <Stethoscope className="h-4 w-4" />
            Visit Purpose <span className="text-destructive">*</span>
          </Label>
          <Input
            id="description"
            name="description"
            value={record.description}
            onChange={handleChange}
            placeholder="Enter the reason for visit"
            required
          />
        </div>
        <div>
          <Label htmlFor="status" className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4" />
            Record Status
          </Label>
          <Select
            value={record.status}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="RESOLVED">Resolved</SelectItem>
              <SelectItem value="FOLLOW_UP">Follow-up Required</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="diagnosis" className="flex items-center gap-2 mb-2">
            <ClipboardCheck className="h-4 w-4" />
            Diagnosis <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="diagnosis"
            name="diagnosis"
            value={record.diagnosis}
            onChange={handleChange}
            placeholder="Enter your diagnosis"
            className="min-h-[100px]"
            required
          />
        </div>
        <div>
          <Label htmlFor="treatment" className="flex items-center gap-2 mb-2">
            <FileText className="h-4 w-4" />
            Treatment Plan <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="treatment"
            name="treatment"
            value={record.treatment}
            onChange={handleChange}
            placeholder="Enter the treatment plan"
            className="min-h-[100px]"
            required
          />
        </div>
      </div>
      
      {record.status === "FOLLOW_UP" && (
        <div>
          <Label htmlFor="followUpDate" className="flex items-center gap-2 mb-2">
            <CalendarIcon className="h-4 w-4" />
            Follow-up Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-full justify-start text-left font-normal ${
                  !record.followUpDate && "text-muted-foreground"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {record.followUpDate ? (
                  format(record.followUpDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar1
                mode="single"
                selected={record.followUpDate}
                onSelect={handleFollowUpDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
      
      <Separator />
      
      {/* Symptoms Section */}
      <div>
        <h3 className="text-lg font-medium mb-4">Symptoms</h3>
        
        <div className="flex gap-2 mb-4">
          <Input
            value={newSymptom}
            onChange={(e) => setNewSymptom(e.target.value)}
            placeholder="Add a symptom"
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSymptom();
              }
            }}
          />
          <Button type="button" onClick={addSymptom} variant="secondary">
            Add
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {record.symptoms && record.symptoms.length > 0 ? (
            record.symptoms.map((symptom, index) => (
              <Badge key={index} variant="secondary" className="gap-1 py-1.5">
                {symptom}
                <button
                  type="button"
                  onClick={() => removeSymptom(index)}
                  className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {symptom}</span>
                </button>
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No symptoms added yet</p>
          )}
        </div>
      </div>
      
      <Separator />
      
      {/* Medications Section */}
      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Pill className="h-4 w-4" />
          Medications
        </h3>
        
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="medicationName">Name</Label>
                <Input
                  id="medicationName"
                  value={newMedication.name}
                  onChange={(e) =>
                    setNewMedication({ ...newMedication, name: e.target.value })
                  }
                  placeholder="Medication name"
                />
              </div>
              <div>
                <Label htmlFor="medicationDosage">Dosage</Label>
                <Input
                  id="medicationDosage"
                  value={newMedication.dosage}
                  onChange={(e) =>
                    setNewMedication({ ...newMedication, dosage: e.target.value })
                  }
                  placeholder="e.g., 10mg"
                />
              </div>
              <div>
                <Label htmlFor="medicationFrequency">Frequency</Label>
                <Input
                  id="medicationFrequency"
                  value={newMedication.frequency}
                  onChange={(e) =>
                    setNewMedication({
                      ...newMedication,
                      frequency: e.target.value,
                    })
                  }
                  placeholder="e.g., Once daily"
                />
              </div>
              <div>
                <Label htmlFor="medicationDuration">Duration</Label>
                <Input
                  id="medicationDuration"
                  value={newMedication.duration}
                  onChange={(e) =>
                    setNewMedication({
                      ...newMedication,
                      duration: e.target.value,
                    })
                  }
                  placeholder="e.g., 30 days"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="medicationNotes">Notes</Label>
                <Input
                  id="medicationNotes"
                  value={newMedication.notes}
                  onChange={(e) =>
                    setNewMedication({ ...newMedication, notes: e.target.value })
                  }
                  placeholder="Additional instructions"
                />
              </div>
            </div>
            
            <Button
              type="button"
              onClick={addMedication}
              className="mt-4 gap-2"
              variant="outline"
            >
              <Plus className="h-4 w-4" />
              Add Medication
            </Button>
          </CardContent>
        </Card>
        
        {record.medications && record.medications.length > 0 ? (
          <div className="space-y-3">
            {record.medications.map((medication, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{medication.name}</h4>
                      <div className="text-sm text-muted-foreground mt-1">
                        <p><strong>Dosage:</strong> {medication.dosage}</p>
                        <p><strong>Frequency:</strong> {medication.frequency}</p>
                        {medication.duration && (
                          <p><strong>Duration:</strong> {medication.duration}</p>
                        )}
                        {medication.notes && (
                          <p><strong>Notes:</strong> {medication.notes}</p>
                        )}
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={() => removeMedication(index)}
                      variant="ghost"
                      size="icon"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove medication</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No medications added yet</p>
        )}
      </div>
      
      <Separator />
      
      {/* Test Results Section */}
      <div>
        <h3 className="text-lg font-medium mb-4">Test Results</h3>
        
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="testName">Test Name</Label>
                <Input
                  id="testName"
                  value={newTestResult.name}
                  onChange={(e) =>
                    setNewTestResult({ ...newTestResult, name: e.target.value })
                  }
                  placeholder="e.g., Blood Pressure"
                />
              </div>
              <div>
                <Label htmlFor="testResult">Result</Label>
                <Input
                  id="testResult"
                  value={newTestResult.result}
                  onChange={(e) =>
                    setNewTestResult({ ...newTestResult, result: e.target.value })
                  }
                  placeholder="e.g., 120/80 mmHg"
                />
              </div>
              <div>
                <Label htmlFor="testDate">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="testDate"
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newTestResult.date
                        ? format(newTestResult.date, "PPP")
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar1
                      mode="single"
                      selected={newTestResult.date}
                      onSelect={(date: any) =>
                        setNewTestResult({ ...newTestResult, date })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="testNotes">Notes</Label>
                <Input
                  id="testNotes"
                  value={newTestResult.notes}
                  onChange={(e) =>
                    setNewTestResult({ ...newTestResult, notes: e.target.value })
                  }
                  placeholder="Additional notes"
                />
              </div>
            </div>
            
            <Button
              type="button"
              onClick={addTestResult}
              className="mt-4 gap-2"
              variant="outline"
            >
              <Plus className="h-4 w-4" />
              Add Test Result
            </Button>
          </CardContent>
        </Card>
        
        {record.testResults && record.testResults.length > 0 ? (
          <div className="space-y-3">
            {record.testResults.map((test, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{test.name}</h4>
                      <div className="text-sm text-muted-foreground mt-1">
                        <p><strong>Result:</strong> {test.result}</p>
                        <p><strong>Date:</strong> {formatDate(test.date)}</p>
                        {test.notes && (
                          <p><strong>Notes:</strong> {test.notes}</p>
                        )}
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={() => removeTestResult(index)}
                      variant="ghost"
                      size="icon"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove test result</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No test results added yet</p>
        )}
      </div>
      
      <Separator />
      
      {/* Additional Notes */}
      <div>
        <Label htmlFor="notes" className="flex items-center gap-2 mb-2">
          Additional Notes
        </Label>
        <Textarea
          id="notes"
          name="notes"
          value={record.notes}
          onChange={handleChange}
          placeholder="Enter any additional notes or observations"
          className="min-h-[150px]"
        />
      </div>
      
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/patients/${patientId}`)}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="gap-2">
          {isSubmitting ? (
            <>
              <LoadingSpinner size="sm" /> 
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              {isEdit ? "Update Record" : "Save Record"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}