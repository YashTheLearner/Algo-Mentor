import type { InterviewStage } from "@/types/interview-session";

const transitions: Record<
  InterviewStage,
  InterviewStage[]
> = {
  INTRO: ["UNDERSTANDING"],
  UNDERSTANDING: ["APPROACH"],
  APPROACH: ["COMPLEXITY"],
  COMPLEXITY: ["CODING"],
  CODING: ["REVIEW"],
  REVIEW: [],
};

export function canTransition(
  from: InterviewStage,
  to: InterviewStage
): boolean {
  return transitions[from].includes(to);
}

export function getNextStage(
  stage: InterviewStage
): InterviewStage | null {
  return transitions[stage][0] ?? null;
}