import { NextResponse } from "next/server";

import { redis } from "@/lib/redis";

import { requireAuth } from "@/lib/api/auth";
import {
  requireActiveInterview,
  requireInterviewAccess,
} from "@/lib/api/interview";

import { parseBody } from "@/lib/api/validation";
import { ErrorCode } from "@/lib/errors";

import {
  sendInterviewMessageSchema,
} from "@/lib/validators/interview";

import { getQuestionById } from "@/lib/interview/question";

import { processInterviewMessage } from "@/services/interview/process-message";

import type { InterviewSession } from "@/types/interview-session";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(
  request: Request,
  { params }: RouteContext
) {
  try {
    // -------------------------------
    // 1. Authentication
    // -------------------------------

    const auth = await requireAuth();

    if (!auth.success) {
      return NextResponse.json(
        {
          success: false,
          message: auth.error.message,
          error: auth.error,
        },
        { status: 401 }
      );
    }

    const { id } = await params;

    // -------------------------------
    // 2. Interview ownership
    // -------------------------------

    const access = await requireInterviewAccess(
      id,
      auth.userId
    );

    if (!access.success) {
      return NextResponse.json(
        {
          success: false,
          message: access.error.message,
          error: access.error,
        },
        { status: access.status }
      );
    }

    // -------------------------------
    // 3. Interview must be active
    // -------------------------------

    const active = requireActiveInterview(
      access.interview
    );

    if (!active.success) {
      return NextResponse.json(
        {
          success: false,
          message: active.error.message,
          error: active.error,
        },
        { status: active.status }
      );
    }

    // -------------------------------
    // 4. Validate request body
    // -------------------------------

    const body = await parseBody(
      request,
      sendInterviewMessageSchema
    );

    if (!body.success) {
      return body.response;
    }

    // -------------------------------
    // 5. Get Redis session
    // -------------------------------

    const interviewSession =
      await redis.get<InterviewSession>(
        `interview:${id}`
      );

    if (!interviewSession) {
      return NextResponse.json(
        {
          success: false,
          message: "Interview session has expired.",
          error: {
            code: ErrorCode.INTERVIEW_EXPIRED,
          },
        },
        { status: 404 }
      );
    }

    // -------------------------------
    // 6. Get current question
    // -------------------------------

    const question = await getQuestionById(
      interviewSession.topic,
      interviewSession.difficulty,
      interviewSession.currentQuestionId
    );

    if (!question) {
      return NextResponse.json(
        {
          success: false,
          message: "Current question was not found.",
          error: {
            code: ErrorCode.NOT_FOUND,
          },
        },
        { status: 404 }
      );
    }

    // -------------------------------
    // 7. Run interviewer engine
    // -------------------------------

    try {
      const result = await processInterviewMessage({
        interviewId: id,
        content: body.data.message,
        question,
      });

      // -------------------------------
      // 8. Return result
      // -------------------------------

      return NextResponse.json(
        {
          success: true,
          message:
            "Interview message processed successfully.",
          data: {
            userMessage: result.userMessage,
            aiMessage: result.aiMessage,
            action: result.action,
            stage: result.stage,
          },
        },
        { status: 200 }
      );
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      switch (error.message) {
        case "INTERVIEW_SESSION_NOT_FOUND":
          return NextResponse.json(
            {
              success: false,
              message: "Interview session not found.",
              error: {
                code: ErrorCode.INTERVIEW_NOT_FOUND,
              },
            },
            { status: 404 }
          );

        case "INTERVIEW_SESSION_EXPIRED":
          return NextResponse.json(
            {
              success: false,
              message: "Interview session has expired.",
              error: {
                code: ErrorCode.INTERVIEW_EXPIRED,
              },
            },
            { status: 404 }
          );

        case "INTERVIEW_NOT_ACTIVE":
          return NextResponse.json(
            {
              success: false,
              message: "Interview is no longer active.",
              error: {
                code: ErrorCode.CONFLICT,
              },
            },
            { status: 409 }
          );

        case "EMPTY_MESSAGE":
          return NextResponse.json(
            {
              success: false,
              message: "Message cannot be empty.",
              error: {
                code: ErrorCode.VALIDATION_ERROR,
              },
            },
            { status: 422 }
          );

        default:
          throw error;
      }
    }
  } catch (error) {
    console.error(
      "INTERVIEW_MESSAGE_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to process interview message.",
        error: {
          code: ErrorCode.INTERNAL_SERVER_ERROR,
        },
      },
      { status: 500 }
    );
  }
}