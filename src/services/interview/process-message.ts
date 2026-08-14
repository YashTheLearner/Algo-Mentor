import { randomUUID } from "node:crypto";

import { redis } from "@/lib/redis";
import { runInterviewerEngine } from "./interviewer-engine";
import { transitionInterviewStage } from "./transition-stage";

import type { InterviewMessage } from "@/types/interview-message";
import type { InterviewSession } from "@/types/interview-session";

const MAX_RECENT_MESSAGES = 30;

interface ProcessMessageParams {
  interviewId: string;
  content: string;

  question: {
    title: string;
    description: string;
    constraints: string[];

    examples: {
      input: string;
      output: string;
      explanation: string;
    }[];
  };
}

export async function processInterviewMessage({
  interviewId,
  content,
  question,
}: ProcessMessageParams) {
  const key = `interview:${interviewId}`;

  // 1. Get current live session
  const session =
    await redis.get<InterviewSession>(key);

  if (!session) {
    throw new Error("INTERVIEW_SESSION_NOT_FOUND");
  }

  if (session.status !== "ACTIVE") {
    throw new Error("INTERVIEW_NOT_ACTIVE");
  }

  const trimmedMessage = content.trim();

  if (!trimmedMessage) {
    throw new Error("EMPTY_MESSAGE");
  }

  // 2. Create USER message
  const userMessage: InterviewMessage = {
    id: randomUUID(),
    role: "USER",
    content: trimmedMessage,
    stage: session.stage,
    timestamp: Date.now(),
  };

  const messagesWithUser = [
    ...session.recentMessages,
    userMessage,
  ];

  // 3. Ask Gemini what to do
  const decision = await runInterviewerEngine({
    session,
    messages: messagesWithUser,
    question,
    candidateMessage: trimmedMessage,
  });

  // 4. Current session may change if stage advances
  let currentSession = session;

  if (decision.action === "ADVANCE_STAGE") {
    currentSession = await transitionInterviewStage({
      interviewId,
    });
  }

  // 5. Handle END_INTERVIEW
  if (decision.action === "END_INTERVIEW") {
    const ttl = await redis.ttl(key);

    if (ttl <= 0) {
      throw new Error("INTERVIEW_SESSION_EXPIRED");
    }

    currentSession = {
      ...currentSession,
      status: "COMPLETED",
    };
  }

  // 6. Create AI message
  const aiMessage: InterviewMessage = {
    id: randomUUID(),
    role: "AI",
    content: decision.response,
    stage: currentSession.stage,
    timestamp: Date.now(),
  };

  // 7. Keep only recent messages
  const recentMessages = [
    ...messagesWithUser,
    aiMessage,
  ].slice(-MAX_RECENT_MESSAGES);

  // 8. Preserve remaining Redis TTL
  const ttl = await redis.ttl(key);

  if (ttl <= 0) {
    throw new Error("INTERVIEW_SESSION_EXPIRED");
  }

  // 9. Save updated session
  const updatedSession: InterviewSession = {
    ...currentSession,
    recentMessages,
  };

  await redis.set(key, updatedSession, {
    ex: ttl,
  });

  return {
    userMessage,
    aiMessage,
    action: decision.action,
    stage: updatedSession.stage,
  };
}