// import { DashboardHeader } from "@/components/dashboard/dashboard-header";
// import { StatsOverview } from "@/components/dashboard/stats-overview";
// import { ContinueInterviewCard } from "@/components/dashboard/continue-interview-card";
// import { AIInsightCard } from "@/components/dashboard/ai-insight-card";
// import { ProgressCard } from "@/components/dashboard/progress-card";
// import { TopicPerformance } from "@/components/dashboard/topic-performance";
// import { RecentInterviews } from "@/components/dashboard/recent-interviews";
// import { WeeklyActivity } from "@/components/dashboard/weekly-activity";

// export default function DashboardPage() {
//   return (
//     <div className="space-y-8">
//       <DashboardHeader />

//       <StatsOverview />

//       <ContinueInterviewCard />

//       <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
//         <ProgressCard />
//         <AIInsightCard />
//       </div>

//       <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
//         <RecentInterviews />
//         <TopicPerformance />
//       </div>

//       <WeeklyActivity />
//     </div>
//   );
// }
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