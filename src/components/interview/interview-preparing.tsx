"use client";

import { useEffect, useState } from "react";
import { Brain, Check, Loader2 } from "lucide-react";

interface InterviewPreparingProps {
  topic: string;
  difficulty: string;
  duration: number;
  mode: string;
}

const steps = [
  "Setting up your interview",
  "Selecting your challenge",
  "Getting everything ready",
];

export function InterviewPreparing({
  topic,
  difficulty,
  duration,
  mode,
}: InterviewPreparingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((step) =>
        Math.min(step + 1, steps.length - 1)
      );
    }, 900);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-[520px] items-center justify-center">
      <div className="w-full max-w-md text-center">
        {/* Animated icon */}
        <div className="relative mx-auto mb-8 flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-blue-500/10" />

          <div className="absolute inset-2 rounded-2xl border border-blue-500/20 bg-blue-500/10" />

          <Brain className="relative h-8 w-8 text-blue-400" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Preparing your interview
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          Give us a moment while we get everything ready.
        </p>

        {/* Configuration */}
        <div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-xs text-zinc-400">
          <span className="text-zinc-200">{topic}</span>
          <span className="text-zinc-700">·</span>

          <span className="capitalize">
            {difficulty}
          </span>

          <span className="text-zinc-700">·</span>

          <span>{duration} min</span>

          <span className="text-zinc-700">·</span>

          <span className="capitalize">{mode}</span>
        </div>

        {/* Steps */}
        <div className="mx-auto mt-8 max-w-xs space-y-3 text-left">
          {steps.map((step, index) => {
            const completed = index < currentStep;
            const active = index === currentStep;

            return (
              <div
                key={step}
                className="flex items-center gap-3"
              >
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    completed
                      ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                      : active
                        ? "border-blue-500/30 bg-blue-500/10"
                        : "border-zinc-800 bg-zinc-900 text-zinc-700"
                  }`}
                >
                  {completed ? (
                    <Check className="h-3 w-3" />
                  ) : active ? (
                    <Loader2 className="h-3 w-3 animate-spin text-blue-400" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                  )}
                </div>

                <span
                  className={`text-sm transition-colors ${
                    completed
                      ? "text-zinc-400"
                      : active
                        ? "text-zinc-200"
                        : "text-zinc-700"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-xs text-zinc-700">
          This usually takes just a moment.
        </p>
      </div>
    </div>
  );
}