"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import { useDebounce } from "@/hooks/use-debounce";
import { runCode } from "@/lib/api/run";

import type { InterviewLanguage } from "@/types/interview";
import type { InterviewMessage } from "@/types/interview-message";
import type { PublicQuestion } from "@/types/question";
import type { RunResult } from "@/types/executor";

import { InterviewHeader } from "./interview-header";
import { ProblemPanel } from "./problem-panel";
import { CodeEditor } from "./code-editor";
import { TestCasePanel } from "./test-case-panel";
import { InterviewerPanel } from "./interviewer-panel";

interface InterviewWorkspaceProps {
  interviewId: string;
  question: PublicQuestion;
  initialCode: string;
  language: InterviewLanguage;
  recentMessages: InterviewMessage[];
  stage?: string;
  hintsUsed?: number;
}

export function InterviewWorkspace({
  interviewId,
  question,
  initialCode,
  language,
  stage = "INTRO",
  hintsUsed = 0,
  recentMessages = [],
}: InterviewWorkspaceProps) {
  const [code, setCode] = useState(initialCode);

  const [isSaving, setIsSaving] =
    useState(false);

  const [isRunning, setIsRunning] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState<"tests" | "output">("tests");

  const [runResult, setRunResult] =
    useState<RunResult | null>(null);

  const debouncedCode = useDebounce(
    code,
    800
  );

  useEffect(() => {
    if (debouncedCode === initialCode) {
      return;
    }

    const saveCode = async () => {
      try {
        setIsSaving(true);

        const response = await fetch(
          `/api/interview/${interviewId}/code`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code: debouncedCode,
              language,
            }),
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message ??
              "Unable to save code."
          );
        }
      } catch (error) {
        console.error(
          "SAVE_CODE_ERROR",
          error
        );

        toast.error(
          "Unable to save your code."
        );
      } finally {
        setIsSaving(false);
      }
    };

    void saveCode();
  }, [
    debouncedCode,
    initialCode,
    interviewId,
    language,
  ]);

  const handleRunCode = async () => {
  try {
    setIsRunning(true);

    const response = await runCode({
      interviewId,
      sourceCode: code,
    });

    setRunResult(response.data);

    setActiveTab("output");
  } catch (error) {
    console.error(error);
    toast.error("Unable to run code.");
  } finally {
    setIsRunning(false);
  }
};

  const handleSubmitCode = async () => {
  toast.info("Submit coming soon.");
};

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
        <ProblemPanel question={question} />

        <section className="grid min-h-0 overflow-hidden rounded-xl border bg-[#0d1117] grid-rows-[48px_minmax(0,1fr)_256px]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 text-white">
            <div className="flex items-center gap-2">
              <span className="rounded bg-blue-500/15 px-2 py-1 text-xs font-medium text-blue-400">
                TS
              </span>

              <span className="text-sm">
                solution.ts
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-white/50">
              {isSaving ? (
                <>
                  <Loader2 className="size-3 animate-spin" />
                  Saving
                </>
              ) : (
                <>
                  <Save className="size-3" />
                  Saved
                </>
              )}
            </div>
          </div>

          <div className="min-h-0 min-w-0">
            <CodeEditor
              code={code}
              onChange={setCode}
              language={language}
            />
          </div>

          <TestCasePanel
  question={question}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  runResult={runResult}
  isRunning={isRunning}
  onRun={handleRunCode}
  onSubmit={handleSubmitCode}
/>
        </section>

        <InterviewerPanel
          interviewId={interviewId}
          initialMessages={recentMessages}
        />
      </div>
    </div>
  );
}