import type { InterviewStage } from "@/types/interview-session";

export type InterviewAction =
  | "CONTINUE"
  | "ADVANCE_STAGE"
  | "GIVE_HINT"
  | "END_INTERVIEW";

export interface InterviewDecision {
  response: string;
  action: InterviewAction;
}

export interface InterviewerContext {
  stage: InterviewStage;
  topic: string;
  difficulty: string;
  questionTitle: string;
}