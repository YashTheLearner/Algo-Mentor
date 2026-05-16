import { InterviewSession } from "../types";

/*
  INTERVENTION RESPONSE
*/

export interface InterventionResponse {
  message: string;

  scorePenalty: number;

  shouldTransitionToLearning: boolean;
}

/*
  LAYER 0
  SILENCE PROBE
*/

const SILENCE_PROBES = [
  "What are you thinking right now?",

  "Talk me through your current approach.",

  "Walk me through where your reasoning is so far.",

  "What possibilities are you considering?",
];

/*
  LAYER 1
  CLARIFYING QUESTIONS
*/

const CLARIFYING_QUESTIONS = [
  "What happens if the input is empty?",

  "What constraints stand out to you here?",

  "Does order matter in this problem?",

  "What information are you given that might help?",
];

/*
  LAYER 2
  APPROACH REDIRECT
*/

const APPROACH_REDIRECTS = [
  "What's the brute-force solution first?",

  "If the input were sorted, would that change anything?",

  "Think about what information you'd want to track as you iterate.",

  "Can you reduce repeated work somehow?",
];

/*
  LAYER 3
  TECHNIQUE REVEAL
*/

const TECHNIQUE_REVEALS = [
  "Think about using a hash map to store previously seen values.",

  "This problem often becomes easier with a sliding window approach.",

  "A two-pointer pattern may simplify things here.",

  "You may benefit from tracking frequencies efficiently.",
];

/*
  LAYER 4
  STRUCTURAL HINT
*/

const STRUCTURAL_HINTS = [
  "Try iterating once and checking whether related information already exists before updating your data structure.",

  "Think about maintaining state while traversing instead of recalculating repeatedly.",

  "A single pass with stored context may simplify implementation.",

  "Break the problem into lookup + update steps.",
];

/*
  RANDOM PICKER
*/

function pickRandom(
  items: string[]
): string {
  const randomIndex =
    Math.floor(
      Math.random() * items.length
    );

  return items[randomIndex];
}

/*
  LAYER 0
  SILENCE PROBE
*/

export function triggerSilenceProbe(): InterventionResponse {
  return {
    message:
      pickRandom(SILENCE_PROBES),

    scorePenalty: 0,

    shouldTransitionToLearning:
      false,
  };
}

/*
  MAIN INTERVENTION ENGINE
*/

export function getIntervention(
  session: InterviewSession
): InterventionResponse {
  const level =
    session.interventionLevel;

  /*
    LAYER 1
  */

  if (level === 1) {
    session.score -= 3;

    return {
      message:
        pickRandom(
          CLARIFYING_QUESTIONS
        ),

      scorePenalty: 3,

      shouldTransitionToLearning:
        false,
    };
  }

  /*
    LAYER 2
  */

  if (level === 2) {
    session.score -= 12;

    return {
      message:
        pickRandom(
          APPROACH_REDIRECTS
        ),

      scorePenalty: 12,

      shouldTransitionToLearning:
        false,
    };
  }

  /*
    LAYER 3
  */

  if (level === 3) {
    session.score -= 22;

    return {
      message:
        pickRandom(
          TECHNIQUE_REVEALS
        ),

      scorePenalty: 22,

      shouldTransitionToLearning:
        false,
    };
  }

  /*
    LAYER 4
  */

  if (level === 4) {
    session.score -= 38;

    return {
      message:
        pickRandom(
          STRUCTURAL_HINTS
        ),

      scorePenalty: 38,

      shouldTransitionToLearning:
        false,
    };
  }

  /*
    BEYOND LAYER 4
  */

  return {
    message:
      "We've gone pretty deep on hints here. Let's switch into learning mode and break the solution down together.",

    scorePenalty: 0,

    shouldTransitionToLearning:
      true,
  };
}