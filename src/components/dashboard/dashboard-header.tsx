import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  name?: string | null;
}

export function DashboardHeader({
  name,
}: DashboardHeaderProps) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 18
        ? "Good afternoon"
        : "Good evening";

  const firstName =
    name?.trim().split(" ")[0] || "there";

  return (
    <section className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60">
      {/* Background effects */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-48 w-48 rounded-full bg-blue-500/5 blur-3xl" />

      {/* Content */}
      <div className="relative flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="max-w-2xl">
          {/* Welcome badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/60 px-3 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />

            <span className="text-xs font-medium text-zinc-400">
              Your interview dashboard
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {greeting},{" "}
            <span className="text-blue-400">
              {firstName}
            </span>{" "}
            <span aria-hidden="true">👋</span>
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
            Track your interview performance, review
            your progress, and keep sharpening your
            problem-solving skills.
          </p>

          {/* Small stats / context */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10">
                <Target className="h-3.5 w-3.5 text-blue-400" />
              </div>

              <span>Technical interviews</span>
            </div>

            <div className="hidden h-4 w-px bg-zinc-800 sm:block" />

            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-800">
                <Zap className="h-3.5 w-3.5 text-zinc-400" />
              </div>

              <span>Improve with every interview</span>
            </div>
          </div>
        </div>

        {/* Right CTA */}
        <div className="relative shrink-0">
          <Link href="/interview">
            <Button
              size="lg"
              className="group h-12 gap-2 rounded-xl bg-blue-500 px-6 font-medium text-white shadow-lg shadow-blue-500/10 transition-all hover:bg-blue-400 hover:shadow-blue-500/20"
            >
              Start Interview

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>

          <p className="mt-2 text-center text-[11px] text-zinc-600">
            Ready when you are
          </p>
        </div>
      </div>
    </section>
  );
}