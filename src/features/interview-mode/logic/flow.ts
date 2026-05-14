import { InterviewStage } from "../types";

const STAGES: InterviewStage[] = [
  "understanding",
  "approach",
  "complexity",
  "coding",
  "review",
];

export function getNextStage(
  currentStage: InterviewStage
): InterviewStage {
  const currentIndex = STAGES.indexOf(currentStage);

  const isLastStage =
    currentIndex === STAGES.length - 1;

  if (isLastStage) {
    return currentStage;
  }

  return STAGES[currentIndex + 1];
}