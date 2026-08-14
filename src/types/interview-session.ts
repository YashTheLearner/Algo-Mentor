import type {
  InterviewDifficulty,
  InterviewLanguage,
  InterviewMode,
} from "@/types/interview";

export type InterviewStatus = "ACTIVE" | "COMPLETED" | "ABANDONED";
export type InterviewStage =
  | "INTRO"
  | "UNDERSTANDING"
  | "APPROACH"
  | "COMPLEXITY"
  | "CODING"
  | "REVIEW";

export interface InterviewPerformance {
  communication: number;
  problemUnderstanding: number;
  algorithmChoice: number;
  coding: number;
  debugging: number;
}

export interface InterviewSession {
  sessionId: string;
  status: InterviewStatus;
  stage: InterviewStage;
  topic: string;
  difficulty: InterviewDifficulty;

  currentQuestionId: string;

  hintsUsed: number;

  startedAt: number;
  duration: number;

  performance: InterviewPerformance;

  conversationSummary: string;

  recentMessages: unknown[];
  code: string;
  language: InterviewLanguage;
}