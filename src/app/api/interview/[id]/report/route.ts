import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { requireAuth } from "@/lib/api/auth";
import { requireInterviewAccess } from "@/lib/api/interview";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
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
        },
        {
          status: 401,
        }
      );
    }

    const { id } = await params;

    const access =
      await requireInterviewAccess(
        id,
        auth.userId
      );

    if (!access.success) {
      return NextResponse.json(
        {
          success: false,
          message: access.error.message,
        },
        {
          status: access.status,
        }
      );
    }

    const interview =
      await prisma.interview.findUnique({
        where: {
          id,
        },
        include: {
          report: true,
        },
      });

    if (!interview) {
      return NextResponse.json(
        {
          success: false,
          message: "Interview not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: interview,
    });
  } catch (error) {
    console.error(
      "GET_REPORT_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to load report.",
      },
      {
        status: 500,
      }
    );
  }
}