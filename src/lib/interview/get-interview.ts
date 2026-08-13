import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";

import type { InterviewSession } from "@/types/interview-session";
import { getQuestionById } from "@/lib/interview/question";

export async function getInterviewById(interviewId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  const interview = await prisma.interview.findFirst({
    where: {
      id: interviewId,
      userId: session.user.id,
    },
    include: {
      questions: {
        orderBy: {
          questionNo: "asc",
        },
      },
    },
  });

  if (!interview) {
    return null;
  }

  const interviewSession =
    await redis.get<InterviewSession>(
      `interview:${interviewId}`
    );

  if (!interviewSession) {
    return null;
  }

  const question = await getQuestionById(
    interviewSession.topic,
    interviewSession.difficulty,
    interviewSession.currentQuestionId
  );

  if (!question) {
    return null;
  }

  return {
    interview,
    session: interviewSession,
    question,
  };
}