"use client";

import { 
  Users, 
  FileText, 
  Calendar, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTimeAgo } from "@/lib/utils";

interface StatisticsCardsProps {
  totalPatients: number;
  activeRecords: number;
  followUps: number;
  pendingActions: number;
  patientIncreasePercentage?: number;
  recordsIncreasePercentage?: number;
}

export default function StatisticsCards({
  totalPatients,
  activeRecords,
  followUps,
  pendingActions,
  patientIncreasePercentage = 5.2,
  recordsIncreasePercentage = 12.5,
}: StatisticsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPatients}</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <span className={patientIncreasePercentage >= 0 ? "text-emerald-500 flex items-center" : "text-rose-500 flex items-center"}>
              {patientIncreasePercentage >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {Math.abs(patientIncreasePercentage)}%
            </span>
            <span>from last month</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Records</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeRecords}</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <span className={recordsIncreasePercentage >= 0 ? "text-emerald-500 flex items-center" : "text-rose-500 flex items-center"}>
              {recordsIncreasePercentage >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {Math.abs(recordsIncreasePercentage)}%
            </span>
            <span>from last week</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Follow-ups</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{followUps}</div>
          <p className="text-xs text-muted-foreground mt-1">Next one: {formatTimeAgo(new Date(Date.now() + 86400000))}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingActions}</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <TrendingUp className="h-3 w-3 text-amber-500" />
            <span>Requires attention</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}