import { NextResponse } from "next/server";
import { z } from "zod";

import { ErrorCode } from "@/lib/errors";

export async function parseBody<T extends z.ZodType>(
  request: Request,
  schema: T
) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return {
      success: false as const,
      response: NextResponse.json(
        {
          success: false,
          message: "Invalid JSON body.",
          error: {
            code: ErrorCode.VALIDATION_ERROR,
          },
        },
        { status: 400 }
      ),
    };
  }

  const result = schema.safeParse(body);

  if (!result.success) {
    return {
      success: false as const,
      response: NextResponse.json(
        {
          success: false,
          message: "Validation failed.",
          error: {
            code: ErrorCode.VALIDATION_ERROR,
            details: result.error.flatten(),
          },
        },
        { status: 422 }
      ),
    };
  }

  return {
    success: true as const,
    data: result.data,
  };
}