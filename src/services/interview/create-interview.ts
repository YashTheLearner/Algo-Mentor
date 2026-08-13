import { prisma } from "@/lib/prisma";
import type { StartInterviewRequest } from "@/types/interview";

interface CreateInterviewParams {
  interviewId: string;
  userId: string;
  data: StartInterviewRequest;
  questions: {
    id: string;
  }[];
}

export async function createInterview({
  interviewId,
  userId,
  data,
  questions,
}: CreateInterviewParams) {
  return prisma.$transaction(async (tx) => {
    const interview = await tx.interview.create({
      data: {
        id: interviewId, // ✅ your own ID

        userId,
        topic: data.topic,
        difficulty: data.difficulty,
        mode: data.mode,
        duration: data.duration,
        questionCount: questions.length,
        status: "ACTIVE",

        questions: {
          create: questions.map((question, index) => ({
            questionId: question.id,
            questionNo: index + 1,
            status: "NOT_STARTED",
          })),
        },
      },

      include: {
        questions: true,
      },
    });

    return interview;
  });
}