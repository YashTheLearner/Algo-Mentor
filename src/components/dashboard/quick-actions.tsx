import Link from "next/link";
import { ArrowRight, History, Play } from "lucide-react";

export function QuickActions() {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Continue your interview preparation.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Start Interview */}
        <Link
          href="/interview"
          className="group rounded-xl border border-blue-500/30 bg-blue-500/10 p-5 transition-all hover:border-blue-400/50 hover:bg-blue-500/15"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/15 text-blue-400">
              <Play className="h-5 w-5" />
            </div>

            <ArrowRight className="h-4 w-4 text-zinc-500 transition-transform group-hover:translate-x-1 group-hover:text-zinc-300" />
          </div>

          <div className="mt-5">
            <h3 className="font-medium text-white">
              Start Interview
            </h3>

            <p className="mt-1 text-sm text-zinc-400">
              Start a new AI-powered mock interview.
            </p>
          </div>
        </Link>

        {/* Previous Interviews */}
        <Link
          href="/interviews"
          className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-zinc-700 hover:bg-zinc-900"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-300">
              <History className="h-5 w-5" />
            </div>

            <ArrowRight className="h-4 w-4 text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-zinc-300" />
          </div>

          <div className="mt-5">
            <h3 className="font-medium text-white">
              Previous Interviews
            </h3>

            <p className="mt-1 text-sm text-zinc-400">
              Review your past interviews and reports.
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}