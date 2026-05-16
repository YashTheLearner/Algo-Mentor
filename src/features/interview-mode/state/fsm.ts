import {
  TechnicalStage,
  BehavioralState,
} from "../types";

/*
  ORDER OF INTERVIEW FLOW
*/

const STAGE_FLOW: TechnicalStage[] = [
  "problem_understanding",
  "approach",
  "implementation",
  "debugging",
  "complexity",
  "optimization",
  "review",
];

/*
  GET NEXT STAGE
*/

export function getNextStage(
  currentStage: TechnicalStage
): TechnicalStage {
  const currentIndex =
    STAGE_FLOW.indexOf(currentStage);

  const isLastStage =
    currentIndex ===
    STAGE_FLOW.length - 1;

  if (isLastStage) {
    return currentStage;
  }

  return STAGE_FLOW[currentIndex + 1];
}

/*
  DETECT BEHAVIORAL STATE
*/

export function detectBehaviorState(
  candidateMessage: string
): BehavioralState {
  const message =
    candidateMessage.toLowerCase();

  /*
    CONFUSED
  */

  if (
    message.includes("i don't know") ||
    message.includes("stuck") ||
    message.includes("confused")
  ) {
    return "confused";
  }

  /*
    LOOPING
  */

  if (
    message.includes("same") ||
    message.includes("again")
  ) {
    return "looping";
  }

  /*
    PROGRESSING
  */

  if (
    message.length > 30
  ) {
    return "progressing";
  }

  /*
    DEFAULT
  */

  return "stalled";
}

/*
  SHOULD TRIGGER SILENCE PROBE?
*/

export function shouldTriggerSilenceProbe(
  lastInteractionAt: number
): boolean {
  const now = Date.now();

  const idleTime =
    now - lastInteractionAt;

  const NINETY_SECONDS =
    90 * 1000;

  return idleTime >=
    NINETY_SECONDS;
}

/*
  SHOULD ADVANCE STAGE?
*/

export function canAdvanceStage(
  behavioralState: BehavioralState
): boolean {
  /*
    DO NOT ADVANCE
  */

  if (
    behavioralState === "stalled" ||
    behavioralState === "confused"
  ) {
    return false;
  }

  return true;
}