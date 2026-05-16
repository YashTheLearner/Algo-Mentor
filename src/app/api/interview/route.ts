import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  createSession,
  getSession,
} from "@/features/interview-mode/state/session";

import {
  processCandidateEvent,
} from "@/features/interview-mode/engine/orchestrator";

import {
  generateInterviewerMessage,
} from "@/features/interview-mode/engine/interviewer";

import {
  InterviewRequest,
} from "@/features/interview-mode/types";

/*
  POST
*/

export async function POST(
  req: NextRequest
) {
  try {
    const body:
      InterviewRequest =
      await req.json();

    /*
      START SESSION
    */

    if (
      body.action === "start"
    ) {
      const session =
        createSession(
          body.sessionId,
          body.sessionType ??
            "practice"
        );

      const intro =
        generateInterviewerMessage(
          session,
          "stage_transition",
          "problem_understanding"
        );

      return NextResponse.json({
        success: true,

        session,

        message:
          intro.message,
      });
    }

    /*
      GET SESSION
    */

    const session =
      getSession(
        body.sessionId
      );

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Session not found",
        },
        {
          status: 404,
        }
      );
    }

    /*
      GET STATE
    */

    if (
      body.action ===
      "state"
    ) {
      return NextResponse.json({
        success: true,
        session,
      });
    }

    /*
      PROCESS EVENT
    */

    if (
      body.action ===
      "event"
    ) {
      if (!body.event) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Event required",
          },
          {
            status: 400,
          }
        );
      }

      /*
        RUN ORCHESTRATOR
      */

      const result =
        processCandidateEvent(
          session,
          body.event
        );

      /*
        INTERVIEWER RESPONSE
      */

      const interviewer =
        generateInterviewerMessage(
          session,

          result
            .triggeredIntervention
            ? "reflection"
            : result
                .shouldAdvanceStage
            ? "stage_transition"
            : "challenge",

          result.nextStage
        );

      return NextResponse.json({
        success: true,

        message:
          result.message ||
          interviewer.message,

        stage:
          session.technicalStage,

        nextStage:
          result.nextStage,

        score:
          result.score,

        completed:
          result.completed,

        interventionTriggered:
          result.triggeredIntervention,

        transitionToLearning:
          result.shouldTransitionToLearning,

        session,
      });
    }

    /*
      INVALID ACTION
    */

    return NextResponse.json(
      {
        success: false,
        error:
          "Invalid action",
      },
      {
        status: 400,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}