"use client";

import { Play, Send } from "lucide-react";

import { Button } from "@/components/ui/button";

import { OutputPanel } from "./output-panel";

import type { PublicQuestion } from "@/types/question";
import type { RunResult } from "@/types/executor";

interface TestCasePanelProps {
  question: PublicQuestion;

  activeTab: "tests" | "output";
  onTabChange: (tab: "tests" | "output") => void;

  runResult: RunResult | null;

  isRunning: boolean;

  onRun: () => void;
  onSubmit?: () => void;
}

export function TestCasePanel({
  question,
  activeTab,
  onTabChange,
  runResult,
  isRunning,
  onRun,
  onSubmit,
}: TestCasePanelProps) {
  return (
    <div className="flex min-h-0 flex-col border-t bg-[#0d1117] text-white">
      <div className="flex border-b border-white/10">
        <button
          onClick={() => onTabChange("tests")}
          className={`flex-1 py-3 text-sm transition ${
            activeTab === "tests"
              ? "border-b-2 border-blue-500 text-white"
              : "text-white/50 hover:text-white"
          }`}
        >
          Test Cases
        </button>

        <button
  disabled={!runResult}
  onClick={() => onTabChange("output")}
  className={`flex-1 py-3 text-sm transition ${
    activeTab === "output"
      ? "border-b-2 border-blue-500 text-white"
      : "text-white/50 hover:text-white"
  } ${
    !runResult
      ? "cursor-not-allowed opacity-50"
      : ""
  }`}
>
  Output
</button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {activeTab === "tests" ? (
          <div className="space-y-3 p-4">
            {question.testCases.public.map(
              (testCase, index) => (
                <div
                  key={`${question.id}-test-${index}`}
                  className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
                >
                  <p className="text-xs text-white/50">
                    Test {index + 1}
                  </p>

                  <div className="mt-2 space-y-2 font-mono text-xs">
                    <div>
  <span className="text-white/50">
    Arguments:
  </span>{" "}
  <pre className="mt-1 whitespace-pre-wrap">
    {JSON.stringify(testCase.arguments)}
  </pre>
</div>

<div>
  <span className="text-white/50">
    Expected:
  </span>{" "}
  <pre className="mt-1 whitespace-pre-wrap">
    {JSON.stringify(testCase.expectedOutput)}
  </pre>
</div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <OutputPanel result={runResult} />
        )}
      </div>

      <div className="flex gap-3 border-t border-white/10 p-3">
        <Button
          onClick={onRun}
          disabled={isRunning}
          variant="outline"
          className="flex-1 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
        >
          <Play className="size-4" />
          {isRunning ? "Running..." : "Run"}
        </Button>

        <Button
          onClick={onSubmit}
          className="flex-1"
        >
          <Send className="size-4" />
          Submit Code
        </Button>
      </div>
    </div>
  );
}