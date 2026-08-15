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
        Run your code to see the output.
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {/* Verdict */}
      <div
        className={`rounded-lg border p-4 ${
          result.accepted
            ? "border-green-500/30 bg-green-500/10"
            : "border-red-500/30 bg-red-500/10"
        }`}
      >
        <div className="flex items-center gap-2">
          {result.accepted ? (
            <CheckCircle2 className="size-5 text-green-400" />
          ) : (
            <XCircle className="size-5 text-red-400" />
          )}

          <span
            className={`font-semibold ${
              result.accepted
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {result.accepted
              ? "Accepted"
              : "Wrong Answer"}
          </span>
        </div>

        <p className="mt-2 text-sm text-white/70">
          Passed {result.passed} / {result.total} Test
          Cases
        </p>
      </div>

      {/* Individual Test Cases */}
      <div className="space-y-3">
        {result.testCases.map((testCase, index) => (
          <div
            key={index}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium">
                Test Case {index + 1}
              </span>

              <span
                className={
                  testCase.passed
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {testCase.passed
                  ? "Passed"
                  : "Failed"}
              </span>
            </div>

            {testCase.input && (
              <div className="mb-2">
                <p className="mb-1 text-xs text-white/50">
                  Input
                </p>

                <pre className="overflow-x-auto rounded bg-black/30 p-2 text-xs">
                  {testCase.input}
                </pre>
              </div>
            )}

            {testCase.expectedOutput && (
              <div className="mb-2">
                <p className="mb-1 text-xs text-white/50">
                  Expected
                </p>

                <pre className="overflow-x-auto rounded bg-black/30 p-2 text-xs">
                  {testCase.expectedOutput}
                </pre>
              </div>
            )}

            {testCase.actualOutput && (
              <div className="mb-2">
                <p className="mb-1 text-xs text-white/50">
                  Output
                </p>

                <pre className="overflow-x-auto rounded bg-black/30 p-2 text-xs">
                  {testCase.actualOutput}
                </pre>
              </div>
            )}

            {testCase.error && (
              <div>
                <p className="mb-1 text-xs text-red-400">
                  Error
                </p>

                <pre className="overflow-x-auto whitespace-pre-wrap rounded bg-red-500/10 p-2 text-xs text-red-300">
                  {testCase.error}
                </pre>
              </div>
            )}

            {(testCase.executionTime ||
              testCase.memory) && (
              <div className="mt-3 flex gap-6 border-t border-white/10 pt-2 text-xs text-white/50">
                <span>
                  Time:{" "}
                  {testCase.executionTime ?? "-"} s
                </span>

                <span>
                  Memory: {testCase.memory ?? "-"} KB
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}