"use client";

import type { PublicQuestion } from "@/types/question";

import { InterviewHeader } from "./interview-header";
import { ProblemPanel } from "./problem-panel";
import { CodeEditor } from "./code-editor";
import { TestCasePanel } from "./test-case-panel";
import { InterviewerPanel } from "./interviewer-panel";

interface InterviewWorkspaceProps {
  question: PublicQuestion;
  stage?: string;
  hintsUsed?: number;
}

export function InterviewWorkspace({
  question,
  stage = "INTRO",
  hintsUsed = 0,
}: InterviewWorkspaceProps) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <InterviewHeader
        title={question.title}
        topic={question.topic}
        difficulty={question.difficulty}
        stage={stage}
        hintsUsed={hintsUsed}
      />

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 p-3 lg:grid-cols-[30%_45%_25%]">
        {/* Problem */}
        <ProblemPanel question={question} />

        {/* Editor + Test Cases */}
        <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border bg-[#0d1117]">
          <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/10 px-4 text-white">
            <div className="flex items-center gap-2">
              <span className="rounded bg-blue-500/15 px-2 py-1 text-xs font-medium text-blue-400">
                TS
              </span>

              <span className="text-sm">
                solution.ts
              </span>
            </div>

            <span className="text-xs text-white/50">
              TypeScript
            </span>
          </div>

          <div className="min-h-0 flex-1">
            <CodeEditor
              initialCode={question.boilerplate.typescript}
              language="typescript"
            />
          </div>

          <TestCasePanel question={question} />
        </section>

        {/* AI */}
        <InterviewerPanel />
      </div>
    </div>
  );
}