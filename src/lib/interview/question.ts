// lib/questions.ts
import type { PublicQuestion, Question } from "@/types/question";
import { questionBank } from "@/data/questions";

export function getQuestions(
  topic: string,
  difficulty: string
): Question[] {
  const topicQuestions =
    questionBank[topic as keyof typeof questionBank];

  if (!topicQuestions) {
    throw new Error(`Questions not found for ${topic}/${difficulty}`);
  }

  const questions =
    topicQuestions[
      difficulty as keyof typeof topicQuestions
    ];

  if (!questions) {
    throw new Error(`Questions not found for ${topic}/${difficulty}`);
  }

  return questions as Question[];
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

    tags: question.tags,
    complexity: question.complexity,
    signature: question.signature,
    interview: question.interview,

    boilerplate: question.boilerplate,

    testCases: {
      public: question.testCases.public,
    },
  };
}