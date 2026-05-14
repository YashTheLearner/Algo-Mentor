import { NextRequest, NextResponse } from "next/server";

import {
  getSession,
  updateSession,
} from "@/features/interview-mode/logic/session";

import { getNextHint } from "@/features/interview-mode/logic/hints";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const session = getSession(
      body.sessionId
    );

    /*
      SESSION NOT FOUND
    */

    if (!session) {
      return NextResponse.json(
        {
          error: "Session not found",
        },
        {
          status: 404,
        }
      );
    }

    /*
      GET HINT
    */

    const result = getNextHint(session);

    /*
      IF HINT NOT ALLOWED
    */

    if (!result.allowed) {
      return NextResponse.json(result);
    }

    /*
      SAVE HINT USAGE
    */

    session.hintsUsed[
      session.currentStage
    ] += 1;

    updateSession(session);

    /*
      RETURN RESPONSE
    */

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}