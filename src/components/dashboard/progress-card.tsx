import {
  ArrowDownRight,
  ArrowUpRight,
  Minus,
  Target,
  TrendingUp,
} from "lucide-react";

type Progress = {
  totalInterviews: number;
  averageScore: number;
  improvement: number | null;
};

interface ProgressCardProps {
  progress: Progress;
}

export function ProgressCard({
  progress,
}: ProgressCardProps) {
  const {
    totalInterviews,
    averageScore,
    improvement,
  } = progress;

  const hasData = totalInterviews > 0;

  const getPerformanceLabel = (score: number) => {
    if (score >= 85) return "Excellent performance";
    if (score >= 70) return "Good performance";
    if (score >= 50) return "Keep improving";
    return "Needs improvement";
  };

  const getImprovementColor = () => {
    if (improvement === null) {
      return "text-zinc-500";
    }

    if (improvement > 0) {
      return "text-emerald-400";
    }

    if (improvement < 0) {
      return "text-red-400";
    }

    return "text-zinc-400";
  };

  const getImprovementIcon = () => {
    if (improvement === null || improvement === 0) {
      return Minus;
    }

    return improvement > 0
      ? ArrowUpRight
      : ArrowDownRight;
  };

  const ImprovementIcon = getImprovementIcon();

  return (
    <section className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/5 blur-3xl" />

      {/* Header */}
      <div className="relative flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
              <Target className="h-4 w-4 text-blue-400" />
            </div>

            <p className="text-sm font-medium text-zinc-300">
              Interview Performance
            </p>
          </div>

          <p className="mt-1 text-xs text-zinc-500">
            Based on your completed interviews
          </p>
        </div>
      </div>

      {/* Main score */}
      <div className="relative mt-8 flex items-center gap-6">
        {/* Progress ring */}
        <div className="relative h-28 w-28 shrink-0">
          <svg
            className="h-full w-full -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Background */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-zinc-800"
            />

            {/* Progress */}
            {hasData && (
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="263.89"
                strokeDashoffset={
                  263.89 -
                  (averageScore / 100) * 263.89
                }
                className="text-blue-500 transition-all duration-700"
              />
            )}
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {hasData ? averageScore : "—"}
            </span>

            {hasData && (
              <span className="text-[10px] text-zinc-500">
                / 100
              </span>
            )}
          </div>
        </div>

        {/* Score information */}
        <div className="min-w-0">
          <p className="text-lg font-semibold text-white">
            {hasData
              ? getPerformanceLabel(averageScore)
              : "No performance data"}
          </p>

          <p className="mt-1 text-sm leading-relaxed text-zinc-500">
            {hasData
              ? "Your average score across completed interviews."
              : "Complete your first interview to start tracking your progress."}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 h-px bg-zinc-800" />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        {/* Improvement */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-zinc-500" />

              <span className="text-xs font-medium text-zinc-500">
                Improvement
              </span>
            </div>

            {improvement !== null && (
              <ImprovementIcon
                className={`h-4 w-4 ${getImprovementColor()}`}
              />
            )}
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span
              className={`text-xl font-semibold ${getImprovementColor()}`}
            >
              {improvement === null
                ? "—"
                : `${improvement > 0 ? "+" : ""}${improvement}`}
            </span>

            {improvement !== null && (
              <span className="text-xs text-zinc-600">
                pts
              </span>
            )}
          </div>

          <p className="mt-1 text-xs text-zinc-600">
            vs previous interview
          </p>
        </div>

        {/* Interviews */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">
              Interviews
            </span>

            <span className="text-xs text-zinc-600">
              Completed
            </span>
          </div>

          <div className="mt-3">
            <span className="text-xl font-semibold text-white">
              {totalInterviews}
            </span>
          </div>

          <p className="mt-1 text-xs text-zinc-600">
            total completed
          </p>
        </div>
      </div>
    </section>
  );
}