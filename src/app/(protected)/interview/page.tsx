import {
  CheckCircle2,
  Code2,
  ShieldCheck,
} from "lucide-react";

import { InterviewConfig } from "@/components/interview/interview-config";

export default function InterviewPage() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-zinc-950 px-4 py-10 sm:px-6 lg:py-14">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        {/* Page heading */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-400">
            <Code2 className="h-3.5 w-3.5 text-blue-400" />
            Technical Interview
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready for your next challenge?
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 sm:text-base">
            Configure your interview and put your
            problem-solving skills to the test.
          </p>
        </div>

        {/* Configuration */}
        <div className="flex justify-center">
          <InterviewConfig />
        </div>

        {/* Trust / info row */}
        <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-zinc-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-zinc-500" />
            Real interview-style questions
          </div>

          <div className="hidden h-3 w-px bg-zinc-800 sm:block" />

          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-zinc-500" />
            Performance tracked automatically
          </div>
        </div>
      </div>
    </main>
  );
}