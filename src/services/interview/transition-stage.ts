import { redis } from "@/lib/redis";
import {
  canTransition,
  getNextStage,
} from "@/lib/interview/state-machine";

import type { InterviewSession } from "@/types/interview-session";

interface TransitionStageParams {
  interviewId: string;
  targetStage?: InterviewSession["stage"];
}

export async function transitionInterviewStage({
  interviewId,
  targetStage,
}: TransitionStageParams) {
  const key = `interview:${interviewId}`;

  const session =
    await redis.get<InterviewSession>(key);

  if (!session) {
    throw new Error("INTERVIEW_SESSION_NOT_FOUND");
  }

  if (session.status !== "ACTIVE") {
    throw new Error("INTERVIEW_NOT_ACTIVE");
  }

  const nextStage =
    targetStage ?? getNextStage(session.stage);

  if (!nextStage) {
    throw new Error("NO_NEXT_STAGE");
  }

  if (!canTransition(session.stage, nextStage)) {
    throw new Error("INVALID_STAGE_TRANSITION");
  }

  const ttl = await redis.ttl(key);

  if (ttl <= 0) {
    throw new Error("INTERVIEW_SESSION_EXPIRED");
  }

  const updatedSession: InterviewSession = {
    ...session,
    stage: nextStage,
  };

  await redis.set(key, updatedSession, {
    ex: ttl,
  });

  return updatedSession;
}