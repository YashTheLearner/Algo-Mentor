import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { randomUUID } from "crypto";

import { authOptions } from "@/lib/auth";
import { startInterviewSchema } from "@/lib/validators/interview";
import { ErrorCode } from "@/lib/errors";
import type {
  StartInterviewRequest,
  StartInterviewResponse,
} from "@/types/interview";

export async function POST(request: Request) {
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

    const body = (await request.json()) as StartInterviewRequest;

    const result = startInterviewSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid interview configuration.",
          error: {
            code: ErrorCode.INVALID_CONFIGURATION,
            details: result.error.issues,
          },
        },
        { status: 422 }
      );
    }

    const interviewId = randomUUID();

    const response: StartInterviewResponse = {
      interviewId,
    };

    return NextResponse.json(
      {
        success: true,
        message: "Interview created successfully.",
        data: response,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("START_INTERVIEW_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to start interview.",
        error: {
          code: ErrorCode.INTERNAL_SERVER_ERROR,
        },
      },
      { status: 500 }
    );
  }
}