import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
} from "lucide-react";

type RecentInterview = {
  id: string;
  topic: string;
  difficulty: string;
  status: string;
  startedAt: Date;
  report: {
    overallScore: number | null;
  } | null;
};

interface RecentInterviewsProps {
  interviews: RecentInterview[];
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getStatus(status: string, score: number | null) {
  if (score !== null) {
    return {
      label: "Completed",
      className:
        "bg-emerald-500/10 text-emerald-400",
    };
  }

  if (status === "ACTIVE") {
    return {
      label: "In Progress",
      className:
        "bg-blue-500/10 text-blue-400",
    };
  }

  return {
    label: "Incomplete",
    className:
      "bg-zinc-800 text-zinc-400",
  };
}

export function RecentInterviews({
  interviews,
}: RecentInterviewsProps) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900/50">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 p-6">
        <div>
          <h2 className="font-semibold text-white">
            Recent Interviews
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            Your latest interview sessions.
          </p>
        </div>

        <Link
          href="/interviews"
          className="flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Empty state */}
      {interviews.length === 0 && (
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-500">
            <CalendarDays className="h-5 w-5" />
          </div>

          <h3 className="mt-4 text-sm font-medium text-white">
            No interviews yet
          </h3>

          <p className="mt-1 max-w-xs text-sm text-zinc-500">
            Start your first mock interview to see your
            results here.
          </p>

          <Link
            href="/interview"
            className="mt-4 text-sm text-blue-400 hover:text-blue-300"
          >
            Start Interview
          </Link>
        </div>
      )}

      {/* Interviews */}
      {interviews.length > 0 && (
        <div className="divide-y divide-zinc-800">
          {interviews.map((interview) => {
            const score =
              interview.report?.overallScore ?? null;

            const status = getStatus(
              interview.status,
              score
            );

            return (
              <Link
                key={interview.id}
                href={`/interviews/${interview.id}`}
                className="group flex items-center justify-between gap-4 p-5 transition-colors hover:bg-zinc-800/30"
              >
                {/* Left */}
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400">
                    <CalendarDays className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-medium text-white">
                      {interview.topic}
                    </h3>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                      <span>{interview.difficulty}</span>

                      <span>•</span>

                      <span>
                        {formatDate(interview.startedAt)}
                      </span>

                      <span>•</span>

                      <span
                        className={`rounded-full px-2 py-0.5 ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex shrink-0 items-center gap-4">
                  {score !== null ? (
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">
                        {score}%
                      </p>

                      <p className="text-xs text-zinc-500">
                        Score
                      </p>
                    </div>
                  ) : (
                    <span className="text-xs text-zinc-500">
                      No score
                    </span>
                  )}

                  <ArrowRight className="h-4 w-4 text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-zinc-300" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}