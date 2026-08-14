import { redis } from "@/lib/redis";
import { InterviewLanguage } from "@/types/interview";
import type { InterviewSession } from "@/types/interview-session";

interface UpdateCodeParams {
  interviewId: string;
  code: string;
  language: InterviewLanguage;
}

interface UpdateCodeResult {
  saved: true;
}

export async function updateInterviewCode({
  interviewId,
  code,
  language,
}: UpdateCodeParams): Promise<UpdateCodeResult> {
  const key = `interview:${interviewId}`;

  // Get the current live interview session.
  const currentSession =
    await redis.get<InterviewSession>(key);

  if (!currentSession) {
    throw new Error("INTERVIEW_SESSION_NOT_FOUND");
  }

  // Make sure the interview is still active.
  if (currentSession.status !== "ACTIVE") {
    throw new Error("INTERVIEW_NOT_ACTIVE");
  }

  // Get remaining TTL before overwriting the key.
  const ttl = await redis.ttl(key);

  if (ttl <= 0) {
    throw new Error("INTERVIEW_SESSION_EXPIRED");
  }

  // Update only the fields related to the editor.
  const updatedSession: InterviewSession = {
    ...currentSession,
    code,
    language,
  };

  // Save while preserving the remaining expiration time.
  await redis.set(key, updatedSession, {
    ex: ttl,
  });

  return {
    saved: true,
  };
}