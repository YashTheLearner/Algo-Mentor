import { NextResponse } from "next/server";

import { redis } from "@/lib/redis";

import { requireAuth } from "@/lib/api/auth";
import {
  requireActiveInterview,
  requireInterviewAccess,
} from "@/lib/api/interview";

import { parseBody } from "@/lib/api/validation";
import { ErrorCode } from "@/lib/errors";

import { getQuestionById } from "@/lib/interview/question";

import { executeCode } from "@/lib/executor/execute";

import { executeCodeSchema } from "@/lib/validators/executor";

import { buildWrapper } from "@/lib/executor/wrappers";

import {
  compareOutputs,
  normalizeOutput,
} from "@/lib/executor/compare";

import type { InterviewSession } from "@/types/interview-session";
import type {
  RunResult,
  TestCaseResult,
} from "@/types/executor";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

// function normalizeOutput(value: string | null): string {
//   return (value ?? "")
//     .trim()
//     .replace(/\r\n/g, "\n");
// }

export async function POST(
  request: Request,
  { params }: RouteContext
) {
  try {
    // ---------------------------------
    // 1. Authentication
    // ---------------------------------

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

    // ---------------------------------
    // 2. Interview ownership
    // ---------------------------------

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

    // ---------------------------------
    // 3. Interview must be active
    // ---------------------------------

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

    // ---------------------------------
    // 4. Validate request body
    // ---------------------------------

    const body = await parseBody(
      request,
      executeCodeSchema
    );

    if (!body.success) {
      return body.response;
    }

    // ---------------------------------
    // 5. Load Redis interview session
    // ---------------------------------

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

    // ---------------------------------
    // 6. Get current question
    // ---------------------------------

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

    // ---------------------------------
    // 7. Run public test cases
    // ---------------------------------

    const publicTestCases =
      question.testCases.public;

    const results: TestCaseResult[] = [];

    for (const testCase of publicTestCases) {
     const wrappedSource = buildWrapper({
  language: interviewSession.language,
  sourceCode: body.data.sourceCode,
  signature: question.signature,
  arguments: testCase.arguments,
});

console.log(wrappedSource);
const execution = await executeCode({
  language: interviewSession.language,
  sourceCode: wrappedSource,
});

      const actualOutput = normalizeOutput(
  execution.stdout
);

const passed =
  execution.status === "Accepted" &&
  compareOutputs(
    actualOutput,
    testCase.expectedOutput
  );

      let error: string | null = null;

      if (!passed) {
        if (execution.compileOutput) {
          error = execution.compileOutput;
        } else if (execution.stderr) {
          error = execution.stderr;
        } else if (execution.message) {
          error = execution.message;
        } else if (
          execution.status !== "Accepted"
        ) {
          error = execution.status;
        }
      }

      results.push({
        input: testCase.input ,
        expectedOutput: JSON.stringify(
    testCase.expectedOutput
),
        actualOutput,
        passed,
        executionTime:
          execution.executionTime,
        memory: execution.memory,
        error,
      });
    }

    // ---------------------------------
    // 8. Build RunResult
    // ---------------------------------

    const passedCount = results.filter(
      (result) => result.passed
    ).length;

    const runResult: RunResult = {
      mode: "run",
      accepted:
        passedCount === publicTestCases.length,
      passed: passedCount,
      total: publicTestCases.length,
      testCases: results,
    };

    // ---------------------------------
    // 9. Return result
    // ---------------------------------

    return NextResponse.json(
      {
        success: true,
        message: "Public test cases executed.",
        data: runResult,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("RUN_CODE_ERROR", error);

    if (error instanceof Error) {
      switch (error.message) {
        case "EMPTY_SOURCE_CODE":
          return NextResponse.json(
            {
              success: false,
              message:
                "Source code cannot be empty.",
              error: {
                code:
                  ErrorCode.VALIDATION_ERROR,
              },
            },
            { status: 422 }
          );

        case "UNSUPPORTED_LANGUAGE":
          return NextResponse.json(
            {
              success: false,
              message:
                "Unsupported programming language.",
              error: {
                code:
                  ErrorCode.VALIDATION_ERROR,
              },
            },
            { status: 422 }
          );

        case "JUDGE0_REQUEST_FAILED":
          return NextResponse.json(
            {
              success: false,
              message:
                "Unable to execute code right now.",
              error: {
                code:
                  ErrorCode.INTERNAL_SERVER_ERROR,
              },
            },
            { status: 502 }
          );

        case "INTERVIEW_SESSION_NOT_FOUND":
          return NextResponse.json(
            {
              success: false,
              message:
                "Interview session not found.",
              error: {
                code:
                  ErrorCode.INTERVIEW_NOT_FOUND,
              },
            },
            { status: 404 }
          );

        case "INTERVIEW_SESSION_EXPIRED":
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
            { status: 404 }
          );
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: "Unable to run code.",
        error: {
          code:
            ErrorCode.INTERNAL_SERVER_ERROR,
        },
      },
      { status: 500 }
    );
  }
}