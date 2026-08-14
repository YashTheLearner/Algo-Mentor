// lib/questions.ts

import { promises as fs } from "fs";
import path from "path";
import type { PublicQuestion, Question } from "@/types/question";

export async function getQuestions(
  topic: string,
  difficulty: string
) {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "questions",
      topic,
      `${difficulty}.json`
    );

    const file = await fs.readFile(filePath, "utf-8");

    return JSON.parse(file);
  } catch (error) {
    throw new Error(
      `Questions not found for ${topic}/${difficulty}`
    );
  }
}

export async function getQuestionById(
  topic: string,
  difficulty: string,
  questionId: string
) {
  const questions = await getQuestions(topic, difficulty);

  return questions.find((q:Question) => q.id === questionId);
}

// export function toPublicQuestion(
//   question: Question
// ): PublicQuestion {
//   return {
//     ...question,
//     testCases: {
//       public: question.testCases.public,
//     },
//   };
// }

export function toPublicQuestion(
  question: Question
): PublicQuestion {
  return {
    id: question.id,
    title: question.title,
    topic: question.topic,
    difficulty: question.difficulty,
    description: question.description,
    constraints: question.constraints,
    examples: question.examples,
    boilerplate: question.boilerplate,
    testCases: {
      public: question.testCases.public,
    },
  };
}