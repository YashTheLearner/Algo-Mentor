import type {
  InterviewSession,
} from "@/types/interview-session";

import type {
  Question,
} from "@/types/question";

export function buildEvaluationPrompt(
  session: InterviewSession,
  question: Question
) {
  return `
Question

${question.title}

Difficulty

${question.difficulty}

Description

${question.description}

Candidate Code

${session.code}

Hints Used

${session.hintsUsed}

Stage Reached

${session.stage}

Conversation

${session.recentMessages
  .map(
    (m) =>
      `${m.role}: ${m.content}`
  )
  .join("\n")}

Evaluate the interview.

Return JSON with this shape:

{
summary:"",
strengths:[],
weaknesses:[],
recommendations:[],
score:{
communication:0,
understanding:0,
algorithm:0,
coding:0,
debugging:0,
overall:0
},
solved:true,
timeComplexity:"",
spaceComplexity:"",
feedback:""
}
`;
}