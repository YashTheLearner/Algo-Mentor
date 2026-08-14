"use client";

import { useState } from "react";
import {
  ArrowRight,
  Brain,
  Clock3,
  Code2,
  Gauge,
  Sparkles,
  Target,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Slider } from "@/components/ui/slider";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { array } from "zod";

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
  { value: "easy", label: "Easy", description: "Fundamental concepts" },
  { value: "medium", label: "Medium", description: "Interview-level problems" },
  { value: "hard", label: "Hard", description: "Advanced problem solving" },
] as const;

const DURATIONS = [
  { value: 15, label: "15 min", description: "Quick practice" },
  { value: 30, label: "30 min", description: "Standard round" },
  { value: 45, label: "45 min", description: "Full problem" },
  { value: 60, label: "60 min", description: "Extended session" },
] as const;

type Duration = (typeof DURATIONS)[number]["value"];

const MODES = [
  {
    value: "guided",
    label: "Guided",
    description: "AI provides guidance when you're stuck.",
    icon: Brain,
  },
  {
    value: "strict",
    label: "Strict",
    description: "Minimal assistance. Simulates a real interview.",
    icon: Gauge,
  },
] as const;

type Difficulty = (typeof DIFFICULTIES)[number]["value"];
type Mode = (typeof MODES)[number]["value"];

export interface InterviewConfig {
  topic: string;
  difficulty: Difficulty;
  duration: number;
  mode: Mode;
}

interface InterviewConfigProps {
  onStart?: (config: InterviewConfig) => void;
}

export function InterviewConfig({ onStart }: InterviewConfigProps) {
  const [topic, setTopic] = useState<string>(TOPICS[0]);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [duration, setDuration] = useState<Duration>(30);
  const [mode, setMode] = useState<Mode>("guided");

  const router = useRouter();

const handleStartInterview = async () => {
  const payload = {
    topic,
    difficulty,
    duration,
    mode,
  };

  try {
    const response = await fetch("/api/interview/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error(result);
      return;
    }

    router.push(`/interview/${result.data.interviewId}`);
  } catch (error) {
    console.error("Failed to start interview:", error);
  }
};

  return (
    <Card className="w-full max-w-3xl border-border/70 bg-card shadow-lg">
      <CardHeader className="space-y-3 border-b">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="size-5" />
          <span className="text-sm font-medium">AI Interview</span>
        </div>

        <div>
          <CardTitle className="text-2xl">Configure your interview</CardTitle>
          <CardDescription className="mt-2">
            Choose how you want AlgoMentor to challenge you.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-8 pt-6">
        {/* Topic */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Code2 className="size-4 text-muted-foreground" />
            <Label>Topic</Label>
          </div>

          <Select
  value={topic}
  onValueChange={(value) => {
    if (value !== null) {
      setTopic(value);
    }
  }}
>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              {TOPICS.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Difficulty */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Target className="size-4 text-muted-foreground" />
            <Label>Difficulty</Label>
          </div>

          <RadioGroup
            value={difficulty}
            onValueChange={(v) => setDifficulty(v as Difficulty)}
            className="grid gap-3 md:grid-cols-3"
          >
            {DIFFICULTIES.map((item) => (
              <Label key={item.value} htmlFor={`difficulty-${item.value}`} className="cursor-pointer">
                <div
                  className={`flex items-start gap-3 rounded-lg border p-4 transition-colors ${difficulty === item.value ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                    }`}
                >
                  <RadioGroupItem id={`difficulty-${item.value}`} value={item.value} />
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Label>
            ))}
          </RadioGroup>
        </div>

        {/* Duration */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock3 className="size-4 text-muted-foreground" />
            <Label>Duration</Label>
          </div>

          <RadioGroup
            value={duration}
            onValueChange={(v) => setDuration(Number(v) as Duration)}
            className="grid gap-3 md:grid-cols-4"
          >
            {DURATIONS.map((item) => (
              <Label key={item.value} htmlFor={`duration-${item.value}`} className="cursor-pointer">
                <div
                  className={`flex items-start gap-3 rounded-lg border p-4 transition-colors ${duration === item.value ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                    }`}
                >
                  <RadioGroupItem id={`duration-${item.value}`} value={item.value} />
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Label>
            ))}
          </RadioGroup>
        </div>

        {/* Interview Mode */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <Brain className="size-4 text-muted-foreground" />
              <Label>Interview Mode</Label>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose how much assistance the AI interviewer provides.
            </p>
          </div>

          <RadioGroup
            value={mode}
            onValueChange={(v) => setMode(v as Mode)}
            className="grid gap-3 md:grid-cols-2"
          >
            {MODES.map((item) => {
              const Icon = item.icon;
              return (
                <Label key={item.value} htmlFor={`mode-${item.value}`} className="cursor-pointer">
                  <div
                    className={`flex gap-4 rounded-lg border p-4 transition-colors ${mode === item.value ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                      }`}
                  >
                    <RadioGroupItem id={`mode-${item.value}`} value={item.value} />
                    <div className="flex gap-3">
                      <Icon className="mt-0.5 size-5 text-primary" />
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Label>
              );
            })}
          </RadioGroup>
        </div>

        <Button size="lg" className="w-full" onClick={handleStartInterview}>
          Start Interview
          <ArrowRight className="size-4" />
        </Button>
      </CardContent>
    </Card>
  );
}