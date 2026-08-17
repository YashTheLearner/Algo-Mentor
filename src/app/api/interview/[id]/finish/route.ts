import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { redis } from "@/lib/redis";

import { requireAuth } from "@/lib/api/auth";
import {
  requireActiveInterview,
  requireInterviewAccess,
} from "@/lib/api/interview";

import { ErrorCode } from "@/lib/errors";

import { getQuestionById } from "@/lib/interview/question";
import { evaluateInterview } from "@/lib/interview/evaluator";

import type { InterviewSession } from "@/types/interview-session";
import { Prisma } from "@/generated/prisma/client";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export interface ReportMetadata {
  solved: boolean;
  feedback: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  stageReached: string;
  hintsUsed: number;
  conversation: {
    role: string;
    content: string;
  }[];
  finalCode: string;
}

export async function POST(
  request: Request,
  { params }: RouteContext
) {
  try {
    // -----------------------------
    // Authentication
    // -----------------------------

    const auth = await requireAuth();

    if (!auth.success) {
      return NextResponse.json(
        {
          success: false,
          message: auth.error.message,
          error: auth.error,
        },
        {
          status: 401,
        }
      );
    }

    const { id } = await params;

    // -----------------------------
    // Ownership
    // -----------------------------

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
          error: access.error,
        },
        {
          status: access.status,
        }
      );
    }

    // -----------------------------
    // Active Interview
    // -----------------------------

    const active =
      requireActiveInterview(
        access.interview
      );

    if (!active.success) {
      return NextResponse.json(
        {
          success: false,
          message: active.error.message,
          error: active.error,
        },
        {
          status: active.status,
        }
      );
    }

    // -----------------------------
    // Redis Session
    // -----------------------------

    const session =
      await redis.get<InterviewSession>(
        `interview:${id}`
      );

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Interview session has expired.",
          error: {
            code:
              ErrorCode.INTERVIEW_EXPIRED,
          },
        },
        {
          status: 404,
        }
      );
    }

    // -----------------------------
    // Load Question
    // -----------------------------

    const question =
      await getQuestionById(
        session.topic,
        session.difficulty,
        session.currentQuestionId
      );

    if (!question) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Question not found.",
          error: {
            code:
              ErrorCode.NOT_FOUND,
          },
        },
        {
          status: 404,
        }
      );
    }

    // -----------------------------
    // AI Evaluation
    // -----------------------------

    const report = await evaluateInterview(
  session,
  question
);

    const metadata: ReportMetadata = {
  solved: report.solved,
  feedback: report.feedback,
  timeComplexity: report.timeComplexity,
  spaceComplexity: report.spaceComplexity,
  stageReached: session.stage,
  hintsUsed: session.hintsUsed,
  conversation: session.recentMessages.map((m) => ({
    role: m.role,
    content: m.content,
  })),
  finalCode: session.code,
};

// await prisma.report.create({
//   data: {
//     ...
//     metadata: metadata as Prisma.InputJsonValue,
//   },
// });

    

    // -----------------------------
    // TODO:
    // Save report to PostgreSQL
    // -----------------------------

   // Update interview
await prisma.interview.update({
  where: {
    id,
  },
  data: {
    status: "COMPLETED",
    completedAt: new Date(),
  },
});

// Create report
await prisma.report.create({
  data: {
    interviewId: id,
    userId: auth.userId,

    overallScore: Math.round(
      report.score.overall * 10
    ),

    communicationScore: Math.round(
      report.score.communication * 10
    ),

    problemUnderstandingScore: Math.round(
      report.score.understanding * 10
    ),

    algorithmChoiceScore: Math.round(
      report.score.algorithm * 10
    ),

    codingScore: Math.round(
      report.score.coding * 10
    ),

    debuggingScore: Math.round(
      report.score.debugging * 10
    ),

    strengths: report.strengths,

    weaknesses: report.weaknesses,

    recommendations:
      report.recommendations,

    summary: report.summary,

     metadata: metadata as unknown as Prisma.InputJsonValue,
  },
});





    // -----------------------------
    // Delete Redis Session
    // -----------------------------

    await redis.del(
      `interview:${id}`
    );

    return NextResponse.json({
      success: true,
      message:
        "Interview completed.",
      data: report,
    });
  } catch (error) {
    console.error(
      "FINISH_INTERVIEW_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to finish interview.",
        error: {
          code:
            ErrorCode.INTERNAL_SERVER_ERROR,
        },
      },
      {
        status: 500,
      }
    );
  }
}