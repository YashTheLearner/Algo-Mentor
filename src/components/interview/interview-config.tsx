"use client";

import { useState } from "react";
import {
  ArrowRight,
  Brain,
  Check,
  Clock3,
  Code2,
  Gauge,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { InterviewPreparing } from "./interview-preparing";

const TOPICS = [
  "Arrays",
  "Binary Search",
  "Strings",
  "Linked List",
  "Recursion",
  "Stack & Queue",
  "Trees",
  "BST",
  "Graphs",
  "Dynamic Programming",
] as const;

const DIFFICULTIES = [
  {
    value: "easy",
    label: "Easy",
    description: "Fundamental concepts",
  },
  {
    value: "medium",
    label: "Medium",
    description: "Interview level",
  },
  {
    value: "hard",
    label: "Hard",
    description: "Advanced problems",
  },
] as const;

const DURATIONS = [
  { value: 15, label: "15 min" },
  { value: 30, label: "30 min" },
  { value: 45, label: "45 min" },
  { value: 60, label: "60 min" },
] as const;

const MODES = [
  {
    value: "guided",
    label: "Guided",
    description:
      "Get hints and guidance when you need them.",
    icon: Brain,
  },
  {
    value: "strict",
    label: "Strict",
    description:
      "Minimal assistance for a realistic interview.",
    icon: Gauge,
  },
] as const;

type Difficulty =
  (typeof DIFFICULTIES)[number]["value"];

type Duration =
  (typeof DURATIONS)[number]["value"];

type Mode =
  (typeof MODES)[number]["value"];

export interface InterviewConfig {
  topic: string;
  difficulty: Difficulty;
  duration: number;
  mode: Mode;
}

interface InterviewConfigProps {
  onStart?: (config: InterviewConfig) => void;
}

export function InterviewConfig({
  onStart,
}: InterviewConfigProps) {
  const router = useRouter();

  const [topic, setTopic] = useState<string>(
    TOPICS[0]
  );

  const [difficulty, setDifficulty] =
    useState<Difficulty>("medium");

  const [duration, setDuration] =
    useState<Duration>(30);

  const [mode, setMode] =
    useState<Mode>("guided");

  const [isStarting, setIsStarting] =
    useState(false);

  const handleStartInterview = async () => {
    const config: InterviewConfig = {
      topic,
      difficulty,
      duration,
      mode,
    };

    onStart?.(config);

    setIsStarting(true);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    try {
      const response = await fetch(
        "/api/interview/start",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(config),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        console.error(result);
        setIsStarting(false);
        return;
      }

      router.push(
        `/interview/${result.data.interviewId}`
      );
    } catch (error) {
      console.error(
        "Failed to start interview:",
        error
      );

      setIsStarting(false);
    }
  };

  if (isStarting) {
  return (
    <InterviewPreparing
      topic={topic}
      difficulty={difficulty}
      duration={duration}
      mode={mode}
    />
  );
}

  return (
    <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-2xl shadow-black/10">
      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-6 sm:px-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400">
              <Sparkles className="h-3.5 w-3.5" />
              Interview Setup
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Configure your interview
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Choose your challenge and start when
              you're ready.
            </p>
          </div>

          <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950/50 sm:flex">
            <Code2 className="h-5 w-5 text-zinc-500" />
          </div>
        </div>
      </div>

      {/* Configuration */}
      <div className="space-y-8 px-6 py-7 sm:px-8">

        {/* Topic */}
<section>
  <div className="mb-3">
    <h3 className="text-sm font-medium text-zinc-200">
      Topic
    </h3>

    <p className="mt-1 text-xs text-zinc-600">
      Select the topic for your interview.
    </p>
  </div>

  <div className=" group relative">
    <select
      value={topic}
      onChange={(e) => setTopic(e.target.value)}
      className="h-12 w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 pr-10 text-sm text-zinc-200 outline-none transition-all hover:border-zinc-700 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
    >
      {TOPICS.map((item) => (
        <option
          key={item}
          value={item}
          className="bg-zinc-950 text-zinc-200"
        >
          {item}
        </option>
      ))}
    </select>

    <Code2 className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 group-hover:text-blue-400 " />
  </div>
</section>

        {/* Difficulty */}
        <section>
          <div className="mb-3">
            <h3 className="text-sm font-medium text-zinc-200">
              Difficulty
            </h3>

            <p className="mt-1 text-xs text-zinc-600">
              Select the level of challenge.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            {DIFFICULTIES.map((item) => {
              const selected =
                difficulty === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() =>
                    setDifficulty(item.value)
                  }
                  className={`relative rounded-xl border p-4 text-left transition-all duration-200 ${
                    selected
                      ? "border-blue-500/50 bg-blue-500/10"
                      : "border-zinc-800 bg-zinc-950/30 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-medium ${
                        selected
                          ? "text-blue-400"
                          : "text-zinc-300"
                      }`}
                    >
                      {item.label}
                    </span>

                    {selected && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>

                  <p className="mt-1 text-xs text-zinc-600">
                    {item.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Duration */}
        <section>
          <div className="mb-3 flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-zinc-500" />

            <div>
              <h3 className="text-sm font-medium text-zinc-200">
                Duration
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {DURATIONS.map((item) => {
              const selected =
                duration === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() =>
                    setDuration(item.value)
                  }
                  className={`rounded-lg border px-5 py-2.5 text-sm font-medium transition-all ${
                    selected
                      ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                      : "border-zinc-800 bg-zinc-950/30 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Mode */}
        <section>
          <div className="mb-3">
            <h3 className="text-sm font-medium text-zinc-200">
              Interview mode
            </h3>

            <p className="mt-1 text-xs text-zinc-600">
              Decide how much assistance you want.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {MODES.map((item) => {
              const Icon = item.icon;

              const selected =
                mode === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() =>
                    setMode(item.value)
                  }
                  className={`relative flex gap-4 rounded-xl border p-4 text-left transition-all duration-200 ${
                    selected
                      ? "border-blue-500/50 bg-blue-500/10"
                      : "border-zinc-800 bg-zinc-950/30 hover:border-zinc-700"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                      selected
                        ? "bg-blue-500/15 text-blue-400"
                        : "bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-medium ${
                          selected
                            ? "text-blue-400"
                            : "text-zinc-300"
                        }`}
                      >
                        {item.label}
                      </span>

                      {selected && (
                        <Check className="h-3.5 w-3.5 text-blue-400" />
                      )}
                    </div>

                    <p className="mt-1 text-xs leading-relaxed text-zinc-600">
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Summary + CTA */}
        <div className="border-t border-zinc-800 pt-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-zinc-600">
                Your interview
              </p>

              <p className="mt-1 text-sm font-medium text-zinc-300">
                {topic}
                <span className="mx-2 text-zinc-700">
                  ·
                </span>
                <span className="capitalize">
                  {difficulty}
                </span>
                <span className="mx-2 text-zinc-700">
                  ·
                </span>
                {duration} min
              </p>
            </div>

            <span className="hidden rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs capitalize text-zinc-500 sm:block">
              {mode} mode
            </span>
          </div>

          <Button
            size="lg"
            className="group h-12 w-full rounded-xl bg-blue-500 font-medium text-white shadow-lg shadow-blue-500/10 transition-all hover:bg-blue-400 hover:shadow-blue-500/20"
            onClick={handleStartInterview}
            disabled={isStarting}
          >
            {isStarting
              ? "Starting interview..."
              : "Start Interview"}

            {!isStarting && (
              <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}