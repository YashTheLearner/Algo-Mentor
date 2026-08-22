import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { ProgressCard } from "@/components/dashboard/progress-card";
import { RecentInterviews } from "@/components/dashboard/recent-interviews";
import { PerformanceBreakdown } from "@/components/dashboard/performance-breakdown";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const email = session?.user?.email;

  const name = session?.user?.name;

  if (!email) {
    redirect("/login");
  }

  const {
  progress,
  performance,
  recentInterviews,
} = await getDashboardData(email);

// console.log("DASHBOARD DATA:", {
//   progress,
//   performance,
//   recentInterviews,
// });

return (
    <div className="space-y-8">
      <DashboardHeader name={name} />

      <QuickActions />

      <div className="grid gap-6 lg:grid-cols-2">
        <ProgressCard progress={progress} />

        <RecentInterviews
          interviews={recentInterviews}
        />
      </div>

      <PerformanceBreakdown
        performance={performance}
      />
    </div>
  );
}