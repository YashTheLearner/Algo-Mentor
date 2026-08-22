import {
  Bug,
  CheckCircle2,
  Code2,
  MessageSquare,
  Route,
  Search,
} from "lucide-react";

type Performance = {
  communication: number;
  problemUnderstanding: number;
  algorithmChoice: number;
  coding: number;
  debugging: number;
};

interface PerformanceBreakdownProps {
  performance: Performance;
}

const categories = [
  {
    key: "communication",
    label: "Communication",
    shortLabel: "Communication",
    icon: MessageSquare,
  },
  {
    key: "problemUnderstanding",
    label: "Problem Understanding",
    shortLabel: "Understanding",
    icon: Search,
  },
  {
    key: "algorithmChoice",
    label: "Algorithm Choice",
    shortLabel: "Algorithms",
    icon: Route,
  },
  {
    key: "coding",
    label: "Coding",
    shortLabel: "Coding",
    icon: Code2,
  },
  {
    key: "debugging",
    label: "Debugging",
    shortLabel: "Debugging",
    icon: Bug,
  },
] as const;

function getScoreLabel(score: number) {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Fair";
  return "Needs work";
}

function getScoreColor(score: number) {
  if (score >= 85) {
    return "text-emerald-400";
  }

  if (score >= 70) {
    return "text-blue-400";
  }

  if (score >= 50) {
    return "text-amber-400";
  }

  return "text-red-400";
}

function getRingColor(score: number) {
  if (score >= 85) {
    return "text-emerald-400";
  }

  if (score >= 70) {
    return "text-blue-400";
  }

  if (score >= 50) {
    return "text-amber-400";
  }

  return "text-red-400";
}

export function PerformanceBreakdown({
  performance,
}: PerformanceBreakdownProps) {
  const hasData = Object.values(performance).some(
    (score) => score > 0
  );

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
              <CheckCircle2 className="h-4 w-4 text-blue-400" />
            </div>

            <h2 className="font-semibold text-white">
              Performance Breakdown
            </h2>
          </div>

          <p className="mt-2 text-sm text-zinc-500">
            See where you're strongest and where you can
            improve.
          </p>
        </div>

        {hasData && (
          <span className="rounded-full border border-zinc-800 bg-zinc-950/50 px-3 py-1 text-xs text-zinc-500">
            5 skills
          </span>
        )}
      </div>

      {/* Empty State */}
      {!hasData ? (
        <div className="mt-6 flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-950/40 p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
            <Code2 className="h-5 w-5 text-zinc-500" />
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-300">
              No performance data yet
            </p>

            <p className="mt-1 text-xs text-zinc-600">
              Complete your first interview to start
              tracking your skills.
            </p>
          </div>
        </div>
      ) : (
        /* Skills */
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const score = performance[category.key];

            const scoreLabel = getScoreLabel(score);
            const scoreColor = getScoreColor(score);
            const ringColor = getRingColor(score);

            const circumference = 2 * Math.PI * 18;

            const dashOffset =
              circumference -
              (score / 100) * circumference;

            return (
              <div
                key={category.key}
                className="group rounded-xl border border-zinc-800 bg-zinc-950/30 p-4 transition-colors hover:border-zinc-700 hover:bg-zinc-950/60"
              >
                <div className="flex items-center justify-between">
                  {/* Skill */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800/80">
                      <Icon className="h-4 w-4 text-zinc-400 transition-colors group-hover:text-zinc-300" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-zinc-200">
                        {category.shortLabel}
                      </p>

                      <p
                        className={`mt-0.5 text-xs ${scoreColor}`}
                      >
                        {scoreLabel}
                      </p>
                    </div>
                  </div>

                  {/* Score Ring */}
                  <div className="relative h-12 w-12 shrink-0">
                    <svg
                      className="h-full w-full -rotate-90"
                      viewBox="0 0 44 44"
                    >
                      <circle
                        cx="22"
                        cy="22"
                        r="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-zinc-800"
                      />

                      <circle
                        cx="22"
                        cy="22"
                        r="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        className={`${ringColor} transition-all duration-700`}
                      />
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-semibold text-white">
                        {score}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom indicator */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-600">
                      Performance
                    </span>

                    <span className={scoreColor}>
                      {score}%
                    </span>
                  </div>

                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${ringColor.replace(
                        "text-",
                        "bg-"
                      )}`}
                      style={{
                        width: `${score}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}