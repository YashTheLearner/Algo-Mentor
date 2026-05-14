export type InterviewStage =
  | "understanding"
  | "approach"
  | "complexity"
  | "coding"
  | "review";

export type InterviewMode = "strict" | "guided";

export interface InterviewSession {
  sessionId: string;

  currentStage: InterviewStage;

  mode: InterviewMode;

  hintsUsed: {
    understanding: number;
    approach: number;
    complexity: number;
    coding: number;
    review: number;
  };

  answers: {
    understanding?: string;
    approach?: string;
    complexity?: string;
    coding?: string;
    review?: string;
  };

  completed: boolean;
}

export interface InterviewRequest {
  sessionId: string;
  answer?: string;
}

export interface InterviewResponse {
  session: InterviewSession;

  question: string;

  canProceed: boolean;
}