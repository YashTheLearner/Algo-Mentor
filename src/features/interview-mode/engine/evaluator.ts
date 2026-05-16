import {
  TechnicalStage,
} from "../types";

/*
  EVALUATION RESULT
*/

export interface EvaluationResult {
  passed: boolean;

  feedback?: string;
}

/*
  KEYWORDS
  TEMP RULE-BASED SYSTEM

  Later replaced with AI.
*/

const STAGE_KEYWORDS: Record<
  TechnicalStage,
  string[]
> = {
  problem_understanding: [
    "input",
    "output",
    "target",
    "sum",
    "indices",
  ],

  approach: [
    "hashmap",
    "map",
    "two pointer",
    "brute force",
    "sort",
  ],

  implementation: [
    "loop",
    "iterate",
    "function",
    "return",
  ],

  debugging: [
    "bug",
    "edge case",
    "null",
    "empty",
  ],

  complexity: [
    "o(",
    "time complexity",
    "space complexity",
  ],

  optimization: [
    "optimize",
    "reduce",
    "improve",
  ],

  review: [
    "learned",
    "mistake",
    "improve",
  ],
};

/*
  MAIN EVALUATOR
*/

export function evaluateStage(
  stage: TechnicalStage,
  candidateMessage: string
): EvaluationResult {
  const message =
    candidateMessage.toLowerCase();

  const keywords =
    STAGE_KEYWORDS[stage];

  const matched =
    keywords.filter((keyword) =>
      message.includes(keyword)
    );

  /*
    PASS THRESHOLD
  */

  const passed =
    matched.length >= 1;

  if (!passed) {
    return {
      passed: false,

      feedback:
        "You're not quite there yet — explain your reasoning a little more.",
    };
  }

  return {
    passed: true,
  };
}