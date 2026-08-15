"use client";

import { CheckCircle2, XCircle } from "lucide-react";

import type { RunResult } from "@/types/executor";

interface OutputPanelProps {
  result: RunResult | null;
}

export function OutputPanel({
  result,
}: OutputPanelProps) {
  if (!result) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-white/50">
        Click <span className="mx-1 font-medium">Run</span>
        to execute your code.
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="mb-5 rounded-lg border border-white/10 bg-white/[0.03] p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Execution Result
          </h3>

          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              result.accepted
                ? "bg-green-500/15 text-green-400"
                : "bg-red-500/15 text-red-400"
            }`}
          >
            {result.passed}/{result.total} Passed
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {result.testCases.map((testCase, index) => (
          <div
            key={index}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="mb-3 flex items-center gap-2">
              {testCase.passed ? (
                <CheckCircle2 className="size-5 text-green-400" />
              ) : (
                <XCircle className="size-5 text-red-400" />
              )}

              <span className="font-medium">
                Test Case {index + 1}
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <p className="mb-1 text-white/50">
                  Input
                </p>

                <pre className="overflow-x-auto rounded bg-black/30 p-2 font-mono text-xs">
                  {testCase.input}
                </pre>
              </div>

              <div>
                <p className="mb-1 text-white/50">
                  Expected Output
                </p>

                <pre className="overflow-x-auto rounded bg-black/30 p-2 font-mono text-xs">
                  {testCase.expectedOutput}
                </pre>
              </div>

              <div>
                <p className="mb-1 text-white/50">
                  Your Output
                </p>

                <pre className="overflow-x-auto rounded bg-black/30 p-2 font-mono text-xs">
                  {testCase.actualOutput ??
                    "(no output)"}
                </pre>
              </div>

              {testCase.error && (
                <div>
                  <p className="mb-1 text-red-400">
                    Error
                  </p>

                  <pre className="overflow-x-auto rounded bg-red-950/30 p-2 font-mono text-xs text-red-300">
                    {testCase.error}
                  </pre>
                </div>
              )}

              <div className="flex gap-6 border-t border-white/10 pt-3 text-xs text-white/60">
                <span>
                  Time:{" "}
                  {testCase.executionTime ??
                    "-"}{" "}
                  s
                </span>

                <span>
                  Memory:{" "}
                  {testCase.memory ?? "-"} KB
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}