import { InterviewStage } from "../types";

export function getQuestion(
  stage: InterviewStage
): string {
  switch (stage) {
    case "understanding":
      return "Can you explain the problem in your own words?";

    case "approach":
      return "What approach would you use to solve this problem?";

    case "complexity":
      return "What is the time and space complexity?";

    case "coding":
      return "Now write the code for your solution.";

    case "review":
      return "Can this solution be optimized further?";

    default:
      return "Continue.";
  }
}