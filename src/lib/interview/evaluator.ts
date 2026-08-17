// import {
//   generateText,
// } from "@/lib/gemini";
import { gemini, GEMINI_MODEL } from "@/lib/gemini";

import {
  EVALUATOR_SYSTEM_PROMPT,
} from "./prompts/system";

import {
  buildEvaluationPrompt,
} from "./prompts/evaluate";

import {
  parseInterviewReport,
} from "./parser";

import type {
  InterviewSession,
} from "@/types/interview-session";

import type {
  Question,
} from "@/types/question";

export async function evaluateInterview(
  session: InterviewSession,
  question: Question
) {
  const response = await gemini.models.generateContent({
    model: GEMINI_MODEL,

    contents: buildEvaluationPrompt(
      session,
      question
    ),

    config: {
      systemInstruction:
        EVALUATOR_SYSTEM_PROMPT,

      responseMimeType:
        "application/json",
    },
  });

  return parseInterviewReport(
    response.text ?? ""
  );

}