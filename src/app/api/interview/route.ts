import { NextRequest, NextResponse } from "next/server";

import {
  createSession,
  getSession,
  updateSession,
} from "@/features/interview-mode/logic/session";

import { getQuestion } from "@/features/interview-mode/logic/prompts";

import { getNextStage } from "@/features/interview-mode/logic/flow";

import { validateAnswer } from "@/features/interview-mode/logic/evaluate";

import {
  InterviewRequest,
  InterviewSession,
} from "@/features/interview-mode/types";

export async function POST(req: NextRequest) {
  try {
    const body: InterviewRequest =
      await req.json();

    let session = getSession(body.sessionId);

    /*
      CREATE SESSION IF NOT EXISTS
    */

    if (!session) {
      session = createSession(body.sessionId);

      return NextResponse.json({
        session,
        question: getQuestion(
          session.currentStage
        ),
        canProceed: true,
      });
    }

    /*
      VALIDATE USER ANSWER
    */

    const isValid = validateAnswer(
      session.currentStage,
      body.answer
    );

    /*
      IF INVALID
    */

    if (!isValid) {
      return NextResponse.json({
        session,
        question:
          "Your answer is too weak. Try again.",
        canProceed: false,
      });
    }

    /*
      SAVE USER ANSWER
    */

    session.answers[session.currentStage] =
      body.answer;

    /*
      MOVE TO NEXT STAGE
    */

    const nextStage = getNextStage(
      session.currentStage
    );

    session.currentStage = nextStage;

    /*
      CHECK COMPLETION
    */

    if (nextStage === "review") {
      session.completed = true;
    }

    /*
      SAVE UPDATED SESSION
    */

    updateSession(session);

    /*
      RETURN RESPONSE
    */

    return NextResponse.json({
      session,
      question: getQuestion(nextStage),
      canProceed: true,
    });
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