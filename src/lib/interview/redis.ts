import { redis } from "@/lib/redis";
import { AppError, ErrorCode } from "../errors";
import type { StartInterviewRequest } from "@/types/interview";


export async function storeInterviewSession(interviewId: string, interviewSession: any, data: StartInterviewRequest) {

const key = `interview:${interviewId}`;

const created = await redis.set(key, interviewSession, {
  nx: true,
  ex: data.duration * 60 + (12*60*60),
});

if (created !== "OK") {
  throw new AppError(
    "Interview session already exists.",
    ErrorCode.REDIS_ERROR,
    409 // Conflict
  );
}
}