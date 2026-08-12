import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { ProgressCard } from "@/components/dashboard/progress-card";
import { RecentInterviews } from "@/components/dashboard/recent-interviews";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader />

      <QuickActions />

      <div className="grid gap-6 lg:grid-cols-2">
        <ProgressCard />
        <RecentInterviews />
      </div>
    </div>
  );
}