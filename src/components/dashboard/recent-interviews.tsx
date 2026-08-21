import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

const interviews = [
  {
    id: "1",
    topic: "Arrays",
    difficulty: "Medium",
    score: 82,
    date: "Aug 21, 2026",
  },
  {
    id: "2",
    topic: "Binary Search",
    difficulty: "Easy",
    score: 76,
    date: "Aug 19, 2026",
  },
  {
    id: "3",
    topic: "Linked List",
    difficulty: "Medium",
    score: 68,
    date: "Aug 17, 2026",
  },
];

export function RecentInterviews() {
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

      {/* Interviews */}
      <div className="divide-y divide-zinc-800">
        {interviews.map((interview) => (
          <Link
            key={interview.id}
            href={`/interviews/${interview.id}`}
            className="group flex items-center justify-between p-5 transition-colors hover:bg-zinc-800/30"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400">
                <CalendarDays className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-medium text-white">
                  {interview.topic}
                </h3>

                <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                  <span>{interview.difficulty}</span>
                  <span>•</span>
                  <span>{interview.date}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-white">
                  {interview.score}%
                </p>

                <p className="text-xs text-zinc-500">
                  Score
                </p>
              </div>

              <ArrowRight className="h-4 w-4 text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-zinc-300" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}