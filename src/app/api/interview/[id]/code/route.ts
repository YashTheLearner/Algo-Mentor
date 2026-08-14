import { NextResponse } from "next/server";

import { requireAuth } from "@/lib/api/auth";
import {
  requireInterviewAccess,
  requireActiveInterview,
} from "@/lib/api/interview";
import { parseBody } from "@/lib/api/validation";
import { ErrorCode } from "@/lib/errors";
import { updateCodeSchema } from "@/lib/validators/interview";
import { updateInterviewCode } from "@/services/interview/update-code";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  try {
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

    const active = requireActiveInterview(access.interview);

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

    const body = await parseBody(
      request,
      updateCodeSchema
    );

    if (!body.success) {
      return body.response;
    }

    try {
      const result = await updateInterviewCode({
        interviewId: id,
        code: body.data.code,
        language: body.data.language,
      });

      return NextResponse.json(
        {
          success: true,
          message: "Code updated successfully.",
          data: result,
        },
        { status: 200 }
      );
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "INTERVIEW_SESSION_NOT_FOUND"
      ) {
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

      throw error;
    }
  } catch (error) {
    console.error("UPDATE_INTERVIEW_CODE_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to save code.",
        error: {
          code: ErrorCode.INTERNAL_SERVER_ERROR,
        },
      },
      { status: 500 }
    );
  }
}