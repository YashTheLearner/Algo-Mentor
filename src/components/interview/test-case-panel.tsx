"use client";

import { Play, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { PublicQuestion } from "@/types/question";

interface TestCasePanelProps {
  question: PublicQuestion;
}

export function TestCasePanel({
  question,
}: TestCasePanelProps) {
  return (
    <div className="flex min-h-0 flex-col border-t bg-[#0d1117] text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <h3 className="text-sm font-medium">Test Cases</h3>
          <p className="text-xs text-white/50">
            Public test cases
          </p>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {question.testCases.public.map((testCase, index) => (
            <div
              key={`${question.id}-test-${index}`}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
            >
              <p className="text-xs text-white/50">
                Test {index + 1}
              </p>

              <div className="mt-2 space-y-2 font-mono text-xs">
                <div>
                  <span className="text-white/50">Input: </span>
                  {testCase.input}
                </div>

                <div>
                  <span className="text-white/50">
                    Expected:{" "}
                  </span>
                  {testCase.expectedOutput}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 border-t border-white/10 p-3">
        <Button
          variant="outline"
          className="flex-1 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
        >
          <Play className="size-4" />
          Run Code
        </Button>

        <Button className="flex-1">
          <Send className="size-4" />
          Submit Code
        </Button>
      </div>
    </div>
  );
}