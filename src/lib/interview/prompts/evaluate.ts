import type { PublicQuestion } from "@/types/question";
import type { InterviewSession } from "@/types/interview-session";

interface BuildEvaluationPromptParams {
  session: InterviewSession;
  question: PublicQuestion;
}

export function buildEvaluationPrompt({
  session,
  question,
}: BuildEvaluationPromptParams) {
  return `
You are an expert senior software engineer evaluating a completed technical interview.

Evaluate the candidate fairly based ONLY on the interview conversation, candidate responses, and submitted code.

Do not invent information.

-------------------------
QUESTION
-------------------------

Title:
${question.title}

Description:
${question.description}

-------------------------
CANDIDATE CODE
-------------------------

${session.code}

-------------------------
INTERVIEW CHAT
-------------------------

${session.messages
  .map(
    (message) =>
      `${message.role.toUpperCase()}: ${message.content}`
  )
  .join("\n\n")}

-------------------------
INTERVIEW INFORMATION
-------------------------

Current Stage:
${session.stage}

Hints Used:
${session.hintsUsed}

Language:
${session.language}

-------------------------
Return ONLY valid JSON.

{
  "overallScore": number,

  "communicationScore": number,

  "problemUnderstandingScore": number,

  "algorithmChoiceScore": number,

  "codingScore": number,

  "debuggingScore": number,

  "strengths": [
    "..."
  ],

  "weaknesses": [
    "..."
  ],

  "recommendations": [
    "..."
  ],

  "summary": "..."
}

Rules:

- Every score must be between 0 and 100.

- strengths:
1-5 concise bullet points.

- weaknesses:
1-5 concise bullet points.

- recommendations:
1-5 actionable improvements.

- summary:
A professional paragraph explaining the candidate's overall performance.

Return ONLY JSON.
`;
}