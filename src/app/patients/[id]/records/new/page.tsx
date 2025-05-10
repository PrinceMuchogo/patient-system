"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/ui/PageHeader";
import RecordForm from "@/components/records/RecordForm";

export default function NewRecordPage() {
  const params = useParams();
  const patientId = params.id as string;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Create Medical Record"
          description="Add a new medical record for this patient"
          action={
            <Link href={`/patients/${patientId}`}>
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Patient
              </Button>
            </Link>
          }
        />
        
        <div className="mt-6">
          <RecordForm patientId={patientId} />
        </div>
      </div>
    </DashboardLayout>
  );
}