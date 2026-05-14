import { InterviewSession } from "../types";

export const HINTS = {
  understanding: [
    "Try explaining the problem in simpler words.",
    "Focus on the input and expected output.",
    "Describe the steps needed to solve it.",
    "Think about edge cases carefully.",
  ],

  approach: [
    "Think about reducing repeated work.",
    "A hashmap or pointer technique may help.",
    "Store previously seen values efficiently.",
    "Use a hashmap for O(n) lookup.",
  ],

  complexity: [
    "How many times does your loop run?",
    "Think about nested loops carefully.",
    "Count operations relative to input size.",
    "Final complexity should be O(n).",
  ],

  coding: [
    "Break the solution into small steps.",
    "Start by initializing data structures.",
    "Write traversal logic first.",
    "Now implement the complete solution.",
  ],

  review: [
    "Think about edge cases.",
    "Can memory usage improve?",
    "Can readability improve?",
    "Consider alternate approaches.",
  ],
};

export function getNextHint(
  session: InterviewSession
) {
  /*
    STRICT MODE
  */

  if (session.mode === "strict") {
    return {
      allowed: false,
      message:
        "Hints are disabled in strict mode.",
    };
  }

  const currentStage = session.currentStage;

  const usedHints =
    session.hintsUsed[currentStage];

  /*
    MAX HINTS REACHED
  */

  if (usedHints >= 4) {
    return {
      allowed: false,
      message:
        "Maximum hints already used.",
    };
  }

  /*
    GET NEXT HINT
  */

  const nextHint =
    HINTS[currentStage][usedHints];

  return {
    allowed: true,
    hintLevel: usedHints + 1,
    hint: nextHint,
  };
}