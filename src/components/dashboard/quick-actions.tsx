import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  History,
  Play,
} from "lucide-react";

export function QuickActions() {
  return (
    <section>
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Jump back into your interview preparation.
        </p>
      </div>

      {/* Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Start Interview */}
        <Link
          href="/interview"
          className="group relative overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/15 via-blue-500/5 to-transparent p-6 transition-all duration-300 hover:border-blue-400/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.08)]"
        >
          {/* Background glow */}
          <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20" />

          <div className="relative">
            <div className="flex items-start justify-between">
              {/* Icon */}
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400">
                <Play className="h-5 w-5 fill-current" />
              </div>

              {/* Arrow */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-400/10 bg-blue-500/5 transition-all duration-300 group-hover:border-blue-400/30 group-hover:bg-blue-500/10">
                <ArrowRight className="h-4 w-4 text-blue-400 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">
                  Start Interview
                </h3>

                <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-400">
                  NEW
                </span>
              </div>

              <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-400">
                Test your problem-solving skills in a
                realistic technical interview.
              </p>
            </div>

            {/* Bottom hint */}
            <div className="mt-6 flex items-center gap-2 text-xs text-zinc-500">
              <Clock3 className="h-3.5 w-3.5" />

              <span>Choose topic, difficulty & duration</span>
            </div>
          </div>
        </Link>

        {/* Previous Interviews */}
        <Link
          href="/interviews"
          className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900"
        >
          <div className="relative">
            <div className="flex items-start justify-between">
              {/* Icon */}
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800/80 text-zinc-300 transition-colors group-hover:border-zinc-600 group-hover:text-white">
                <History className="h-5 w-5" />
              </div>

              {/* Arrow */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/40 transition-all duration-300 group-hover:border-zinc-700 group-hover:bg-zinc-800">
                <ArrowRight className="h-4 w-4 text-zinc-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-zinc-300" />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-white">
                Previous Interviews
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-500">
                Review your previous interviews, scores,
                and detailed performance reports.
              </p>
            </div>

            {/* Bottom hint */}
            <div className="mt-6 flex items-center gap-2 text-xs text-zinc-600">
              <History className="h-3.5 w-3.5" />

              <span>View interview history & reports</span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}