import { InterviewStage } from "../types";

export function validateAnswer(
  stage: InterviewStage,
  answer?: string
): boolean {
  if (!answer || answer.trim().length < 5) {
    return false;
  }

  switch (stage) {
    case "understanding":
      return answer.length > 20;

    case "approach":
      return (
        answer.includes("hash") ||
        answer.includes("pointer") ||
        answer.includes("loop") ||
        answer.includes("sort")
      );

    case "complexity":
      return answer.includes("O(");

    case "coding":
      return answer.length > 30;

    case "review":
      return true;

    default:
      return false;
  }
}