import {
  gemini,
  GEMINI_MODEL,
} from "@/lib/gemini";

import type { InterviewMessage } from "@/types/interview-message";
import type { InterviewSession } from "@/types/interview-session";
import type { InterviewDecision } from "@/types/interviewer";

interface InterviewQuestionContext {
  title: string;
  description: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation: string;
  }[];
}

interface RunInterviewerParams {
  session: InterviewSession;
  messages: InterviewMessage[];
  question: InterviewQuestionContext;
  candidateMessage: string;
}

export async function runInterviewerEngine({
  session,
  messages,
  question,
  candidateMessage,
}: RunInterviewerParams): Promise<InterviewDecision> {
  const conversation = messages
    .map(
      (message) =>
        `${message.role}: ${message.content}`
    )
    .join("\n");

  const prompt = `
You are the technical interviewer for AlgoMentor.

You are conducting a structured DSA coding interview.

CURRENT STAGE:
${session.stage}

TOPIC:
${session.topic}

DIFFICULTY:
${session.difficulty}

PROBLEM:
${question.title}

DESCRIPTION:
${question.description}

CONSTRAINTS:
${question.constraints.join("\n")}

PREVIOUS CONVERSATION:
${conversation}

LATEST CANDIDATE MESSAGE:
${candidateMessage}

========================================
STAGE OBJECTIVES
========================================

INTRO:
- Briefly establish the interview.
- Ask the candidate to explain the problem in their own words.
- Do not discuss the optimal algorithm yet.

UNDERSTANDING:
- Verify the candidate understands inputs and outputs.
- Explore constraints and important edge cases.
- Do not ask them to implement code yet.

APPROACH:
- Ask the candidate to propose an algorithm.
- Challenge their reasoning when necessary.
- Do not reveal the optimal approach unless a hint is justified.

COMPLEXITY:
- Ask for time and space complexity.
- Challenge incorrect complexity analysis.

CODING:
- Candidate should implement the chosen approach.
- Ask about bugs, edge cases, and implementation details.

REVIEW:
- Review the final solution.
- Discuss correctness, complexity, and improvements.

========================================
RULES
========================================

1. Stay within the CURRENT STAGE.
2. Do not skip stages.
3. Do not reveal the complete solution.
4. Do not reveal hidden test cases.
5. Do not invent problem details.
6. Be concise and interview-like.
7. Only use ADVANCE_STAGE when the candidate has
   demonstrated the objective of the current stage.
8. If the candidate has not demonstrated enough
   understanding, use CONTINUE.
9. Use GIVE_HINT only when a hint is appropriate.
10. The backend controls the actual next stage.
11. Never provide a nextStage field.

========================================
OUTPUT
========================================

Return ONLY JSON:

{
  "response": "string",
  "action": "CONTINUE | ADVANCE_STAGE | GIVE_HINT | END_INTERVIEW"
}
`;

  const response = await gemini.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          response: {
            type: "string",
          },
          action: {
            type: "string",
            enum: [
              "CONTINUE",
              "ADVANCE_STAGE",
              "GIVE_HINT",
              "END_INTERVIEW",
            ],
          },
        },
        required: ["response", "action"],
      },
    },
  });

  if (!response.text) {
    throw new Error("GEMINI_EMPTY_RESPONSE");
  }

  let decision: InterviewDecision;

  try {
    decision = JSON.parse(response.text) as InterviewDecision;
  } catch {
    throw new Error("GEMINI_INVALID_RESPONSE");
  }

  return decision;
}