import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { ErrorCode } from "@/lib/errors";
import type { InterviewSession } from "@/types/interview-session";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const session = await getServerSession(authOptions);
  

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required.",
          error: {
            code: ErrorCode.UNAUTHORIZED,
          },
        },
        { status: 401 }
      );
    }

    const { id: interviewId } = await params;
    if (!interviewId) {
      return NextResponse.json(
        {
          success: false,
          message: "Interview ID is required.",
          error: {
            code: ErrorCode.VALIDATION_ERROR,
          },
        },
        { status: 400 }
      );
    }

    // Verify ownership in PostgreSQL.
    const interview = await prisma.interview.findFirst({
      where: {
        id: interviewId,
        userId: session.user.id,
      },
      select: {
        id: true,
        status: true,
      },
    });

    if (!interview) {
      return NextResponse.json(
        {
          success: false,
          message: "Interview not found.",
          error: {
            code: ErrorCode.INTERVIEW_NOT_FOUND,
          },
        },
        { status: 404 }
      );
    }

    // Get the live interview state from Redis.
    const interviewSession =
  await redis.get<InterviewSession>(`interview:${interviewId}`);

    if (!interviewSession) {
      return NextResponse.json(
        {
          success: false,
          message: "Interview session has expired or does not exist.",
          error: {
            code: ErrorCode.INTERVIEW_EXPIRED,
          },
        },
        { status: 404 }
      );
    }

   return NextResponse.json(
  {
    success: true,
    message: "Interview session retrieved successfully.",
    data: {
      interviewId: interview.id,
      session: interviewSession,
    },
  },
  { status: 200 }
);
  } catch (error) {
    console.error("GET_INTERVIEW_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve interview.",
        error: {
          code: ErrorCode.INTERNAL_SERVER_ERROR,
        },
      },
      { status: 500 }
    );
  }
}