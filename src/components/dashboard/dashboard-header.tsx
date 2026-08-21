"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#0b0f17] p-8 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-2xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
          <Sparkles className="h-3.5 w-3.5" />
          Welcome back
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-white">
          Good evening 👋
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          Continue improving your interview skills with realistic AI-powered
          coding interviews and personalized feedback.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Button
          size="lg"
          className="gap-2 rounded-xl px-6"
        >
          Start Interview
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}