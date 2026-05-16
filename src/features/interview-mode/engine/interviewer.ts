import {
  SessionType,
  TechnicalStage,
  BehavioralState,
  InterviewSession,
} from "../types";

/*
  INTERVIEWER RESPONSE
*/

export interface InterviewerResponse {
  message: string;
}

/*
  MAIN INTERVIEWER
*/

export function generateInterviewerMessage(
  session: InterviewSession,
  intent:
    | "stage_transition"
    | "encouragement"
    | "reflection"
    | "challenge"
    | "recovery",

  nextStage?: TechnicalStage
): InterviewerResponse {
  /*
    PRACTICE MODE
  */

  if (
    session.sessionType ===
    "practice"
  ) {
    return generatePracticeResponse(
      session,
      intent,
      nextStage
    );
  }

  /*
    MOCK MODE
  */

  return generateMockResponse(
    session,
    intent,
    nextStage
  );
}

/*
  PRACTICE MODE
*/

function generatePracticeResponse(
  session: InterviewSession,
  intent: string,
  nextStage?: TechnicalStage
): InterviewerResponse {
  switch (intent) {
    case "stage_transition":
      return {
        message:
          getPracticeTransition(
            nextStage
          ),
      };

    case "encouragement":
      return {
        message:
          "You're moving in a reasonable direction — keep going.",
      };

    case "reflection":
      return {
        message:
          "Talk me through what you're thinking so far.",
      };

    case "challenge":
      return {
        message:
          "Something feels incomplete here — what might you be missing?",
      };

    case "recovery":
      return {
        message:
          "You're getting back on track. Keep reasoning through it.",
      };

    default:
      return {
        message:
          "Let's continue.",
      };
  }
}

/*
  MOCK MODE
*/

function generateMockResponse(
  session: InterviewSession,
  intent: string,
  nextStage?: TechnicalStage
): InterviewerResponse {
  switch (intent) {
    case "stage_transition":
      return {
        message:
          getMockTransition(
            nextStage
          ),
      };

    case "encouragement":
      return {
        message:
          "Continue.",
      };

    case "reflection":
      return {
        message:
          "Walk me through your reasoning.",
      };

    case "challenge":
      return {
        message:
          "I think you're missing something important here.",
      };

    case "recovery":
      return {
        message:
          "Go on.",
      };

    default:
      return {
        message:
          "Continue.",
      };
  }
}

/*
  PRACTICE TRANSITIONS
*/

function getPracticeTransition(
  stage?: TechnicalStage
): string {
  switch (stage) {
    case "approach":
      return "Nice. Now, what approach would you use to solve this?";

    case "implementation":
      return "That sounds reasonable. Go ahead and implement it.";

    case "debugging":
      return "Before moving on, think about edge cases or bugs.";

    case "complexity":
      return "Good progress. What's the time and space complexity?";

    case "optimization":
      return "Can this be improved further?";

    case "review":
      return "Let's reflect — what would you improve next time?";

    default:
      return "Let's continue.";
  }
}

/*
  MOCK TRANSITIONS
*/

function getMockTransition(
  stage?: TechnicalStage
): string {
  switch (stage) {
    case "approach":
      return "What approach would you take?";

    case "implementation":
      return "Implement it.";

    case "debugging":
      return "Any edge cases?";

    case "complexity":
      return "Complexity?";

    case "optimization":
      return "Can you optimize this?";

    case "review":
      return "Let's review your solution.";

    default:
      return "Continue.";
  }
}