import type { InterviewStage } from "@/types/interview-session";

const transitions: Record<
  InterviewStage,
  InterviewStage | null
> = {
  INTRO: "UNDERSTANDING",
  UNDERSTANDING: "APPROACH",
  APPROACH: "COMPLEXITY",
  COMPLEXITY: "CODING",
  CODING: "REVIEW",
  REVIEW: null,
};

export function getNextStage(
  stage: InterviewStage
): InterviewStage | null {
  return transitions[stage];
}

export function canTransition(
  from: InterviewStage,
  to: InterviewStage
): boolean {
  return transitions[from] === to;
}