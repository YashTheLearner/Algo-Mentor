import {
  CandidateEvent,
  InterviewSession,
  TechnicalStage,
} from "../types";

import {
  detectBehaviorState,
  getNextStage,
  shouldTriggerSilenceProbe,
  canAdvanceStage,
} from "../state/fsm";

import {
  addEvent,
  addReasoning,
  increaseInterventionLevel,
  resetInterventionLevel,
  updateBehavioralState,
  advanceStage,
  completeSession,
} from "../state/session";

import {
  getIntervention,
  triggerSilenceProbe,
} from "./intervention";

import {
  evaluateStage,
} from "./evaluator";

/*
  ORCHESTRATOR RESPONSE
*/

export interface OrchestratorResponse {
  message: string;

  shouldAdvanceStage: boolean;

  nextStage?: TechnicalStage;

  triggeredIntervention: boolean;

  score: number;

  completed: boolean;

  shouldTransitionToLearning: boolean;
}

/*
  MAIN INTERVIEW ENGINE
*/

export function processCandidateEvent(
  session: InterviewSession,
  event: CandidateEvent
): OrchestratorResponse {
  /*
    SAVE EVENT
  */

  addEvent(session, event);

  /*
    IDLE TIMEOUT
    LAYER 0
  */

  if (event.type === "idle_timeout") {
    const shouldProbe =
      shouldTriggerSilenceProbe(
        session.lastInteractionAt
      );

    if (shouldProbe) {
      const probe =
        triggerSilenceProbe();

      return {
        message: probe.message,

        shouldAdvanceStage:
          false,

        triggeredIntervention:
          true,

        score: session.score,

        completed:
          session.completed,

        shouldTransitionToLearning:
          false,
      };
    }

    return {
      message: "",

      shouldAdvanceStage:
        false,

      triggeredIntervention:
        false,

      score: session.score,

      completed:
        session.completed,

      shouldTransitionToLearning:
          false,
      };
  }

  /*
    HINT REQUEST
  */

  if (event.type === "hint_request") {
    /*
      ANTI-SPOONFEEDING
      Required for Layer 2+
    */

    const latestReasoning =
      session.memory
        .reasoningHistory[
        session.memory
          .reasoningHistory.length - 1
      ];

    const insufficientReflection =
      !latestReasoning ||
      latestReasoning.trim().length <
        20;

    if (
      insufficientReflection &&
      session.interventionLevel >=
        2
    ) {
      return {
        message:
          "Before I step in further, tell me what you've tried so far and exactly where you're getting stuck.",

        shouldAdvanceStage:
          false,

        triggeredIntervention:
          false,

        score: session.score,

        completed:
          session.completed,

        shouldTransitionToLearning:
          false,
      };
    }

    /*
      ESCALATE
    */

    increaseInterventionLevel(
      session
    );

    const intervention =
      getIntervention(session);

    return {
      message:
        intervention.message,

      shouldAdvanceStage:
        false,

      triggeredIntervention:
        true,

      score: session.score,

      completed:
        session.completed,

      shouldTransitionToLearning:
        intervention.shouldTransitionToLearning,
    };
  }

  /*
    CANDIDATE MESSAGE
  */

  if (
    event.type ===
    "candidate_message"
  ) {
    const content =
      event.content?.trim() ?? "";

    /*
      EMPTY MESSAGE
    */

    if (!content) {
      return {
        message:
          "Walk me through what you're thinking.",

        shouldAdvanceStage:
          false,

        triggeredIntervention:
          false,

        score: session.score,

        completed:
          session.completed,

        shouldTransitionToLearning:
          false,
      };
    }

    /*
      SAVE REASONING
    */

    addReasoning(
      session,
      content
    );

    /*
      DETECT BEHAVIOR
    */

    const behavioralState =
      detectBehaviorState(
        content
      );

    updateBehavioralState(
      session,
      behavioralState
    );

    /*
      CANDIDATE RECOVERING
    */

    if (
      behavioralState ===
      "progressing" ||
      behavioralState ===
      "recovering"
    ) {
      resetInterventionLevel(
        session
      );
    }

    /*
      STAGE EVALUATION
    */

    const evaluation =
      evaluateStage(
        session.technicalStage,
        content
      );

    if (!evaluation.passed) {
      return {
        message:
          evaluation.feedback ??
          "You're close — explain your thinking a little more.",

        shouldAdvanceStage:
          false,

        triggeredIntervention:
          false,

        score: session.score,

        completed:
          session.completed,

        shouldTransitionToLearning:
          false,
      };
    }

    /*
      BEHAVIOR CHECK
    */

    const canMove =
      canAdvanceStage(
        behavioralState
      );

    if (!canMove) {
      return {
        message:
          "Keep going — walk me through your reasoning.",

        shouldAdvanceStage:
          false,

        triggeredIntervention:
          false,

        score: session.score,

        completed:
          session.completed,

        shouldTransitionToLearning:
          false,
      };
    }

    /*
      FINAL STAGE
    */

    if (
      session.technicalStage ===
      "review"
    ) {
      completeSession(
        session
      );

      return {
        message:
          "Nice work. That concludes the interview.",

        shouldAdvanceStage:
          false,

        triggeredIntervention:
          false,

        score: session.score,

        completed: true,

        shouldTransitionToLearning:
          false,
      };
    }

    /*
      ADVANCE STAGE
    */

    const nextStage =
      getNextStage(
        session.technicalStage
      );

    advanceStage(
      session,
      nextStage
    );

    return {
      message:
        getStageTransitionMessage(
          nextStage
        ),

      shouldAdvanceStage:
        true,

      nextStage,

      triggeredIntervention:
        false,

      score: session.score,

      completed:
        session.completed,

      shouldTransitionToLearning:
        false,
    };
  }

  /*
    UNKNOWN EVENT
  */

  return {
    message:
      "Unhandled event.",

    shouldAdvanceStage:
      false,

    triggeredIntervention:
      false,

    score: session.score,

    completed:
      session.completed,

    shouldTransitionToLearning:
      false,
  };
}

/*
  INTERVIEWER TRANSITIONS
*/

function getStageTransitionMessage(
  stage: TechnicalStage
): string {
  switch (stage) {
    case "approach":
      return "Alright — what approach would you take here?";

    case "implementation":
      return "Looks reasonable. Go ahead and implement it.";

    case "debugging":
      return "Let's think through possible edge cases and bugs.";

    case "complexity":
      return "What's the time and space complexity?";

    case "optimization":
      return "Can we improve this further?";

    case "review":
      return "Let's reflect. What would you do differently next time?";

    default:
      return "Let's continue.";
  }
}