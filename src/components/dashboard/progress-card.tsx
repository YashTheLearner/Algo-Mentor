import { ArrowUpRight, Target, TrendingUp } from "lucide-react";

export function ProgressCard() {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-400">
            Interview Performance
          </p>

          <h2 className="mt-2 text-3xl font-semibold text-white">
            72%
          </h2>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
          <Target className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-zinc-400">
            Overall performance
          </span>

          <span className="text-zinc-300">
            72 / 100
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-blue-500"
            style={{ width: "72%" }}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <TrendingUp className="h-4 w-4" />

            <span className="text-xs">
              Improvement
            </span>
          </div>

          <p className="mt-2 text-lg font-semibold text-white">
            +12%
          </p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <ArrowUpRight className="h-4 w-4" />

            <span className="text-xs">
              Interviews
            </span>
          </div>

          <p className="mt-2 text-lg font-semibold text-white">
            8
          </p>
        </div>
      </div>
    </section>
  );
}