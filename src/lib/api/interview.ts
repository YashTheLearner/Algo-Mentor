import { prisma } from "@/lib/prisma";
import { ErrorCode } from "@/lib/errors";

export async function requireInterviewAccess(
  interviewId: string,
  userId: string
) {
  const interview = await prisma.interview.findFirst({
    where: {
      id: interviewId,
      userId,
    },
  });

  if (!interview) {
    return {
      success: false as const,
      status: 404 as const,
      error: {
        code: ErrorCode.INTERVIEW_NOT_FOUND,
        message: "Interview not found.",
      },
    };
  }

  return {
    success: true as const,
    interview,
  };
}

export function requireActiveInterview(
  interview: {
    status: string;
  }
) {
  if (interview.status !== "ACTIVE") {
    return {
      success: false as const,
      status: 409 as const,
      error: {
        code: ErrorCode.INTERVIEW_EXPIRED,
        message: "Interview is no longer active.",
      },
    };
  }

  return {
    success: true as const,
  };
}