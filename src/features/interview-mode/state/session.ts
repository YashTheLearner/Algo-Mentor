import {
  CandidateEvent,
  InterviewSession,
  SessionType,
  TechnicalStage,
  BehavioralState,
} from "../types";

/*
  TEMP MEMORY STORAGE

  Development only.
  Replace with Redis/DB later.
*/

const sessions = new Map<
  string,
  InterviewSession
>();

/*
  CREATE NEW SESSION
*/

export function createSession(
  sessionId: string,
  sessionType: SessionType
): InterviewSession {
  const now = Date.now();

  const session: InterviewSession = {
    sessionId,

    sessionType,

    technicalStage:
      "problem_understanding",

    behavioralState:
      "progressing",

    interventionLevel: 0,

    score: 100,

    currentQuestionId: "two-sum",

    memory: {
      reasoningHistory: [],

      mistakes: [],

      interventionsUsed: 0,

      strengths: [],
    },

    eventHistory: [],

    startedAt: now,

    lastInteractionAt: now,

    completed: false,
  };

  sessions.set(sessionId, session);

  return session;
}

/*
  GET SESSION
*/

export function getSession(
  sessionId: string
): InterviewSession | undefined {
  return sessions.get(sessionId);
}

/*
  UPDATE SESSION
*/

export function updateSession(
  session: InterviewSession
): void {
  session.lastInteractionAt =
    Date.now();

  sessions.set(
    session.sessionId,
    session
  );
}

/*
  DELETE SESSION
*/

export function deleteSession(
  sessionId: string
): void {
  sessions.delete(sessionId);
}

/*
  CHECK IF SESSION EXISTS
*/

export function sessionExists(
  sessionId: string
): boolean {
  return sessions.has(sessionId);
}

/*
  ADD EVENT TO HISTORY
*/

export function addEvent(
  session: InterviewSession,
  event: CandidateEvent
): void {
  session.eventHistory.push(event);

  session.lastInteractionAt =
    Date.now();

  updateSession(session);
}

/*
  ADD REASONING MEMORY
*/

export function addReasoning(
  session: InterviewSession,
  reasoning: string
): void {
  session.memory.reasoningHistory.push(
    reasoning
  );

  updateSession(session);
}

/*
  ADD MISTAKE
*/

export function addMistake(
  session: InterviewSession,
  mistake: string
): void {
  session.memory.mistakes.push(
    mistake
  );

  updateSession(session);
}

/*
  ADD STRENGTH
*/

export function addStrength(
  session: InterviewSession,
  strength: string
): void {
  session.memory.strengths.push(
    strength
  );

  updateSession(session);
}

/*
  INCREASE INTERVENTION LEVEL
*/

export function increaseInterventionLevel(
  session: InterviewSession
): void {
  if (
    session.interventionLevel < 4
  ) {
    session.interventionLevel += 1;

    session.memory
      .interventionsUsed += 1;

    updateSession(session);
  }
}

/*
  RESET INTERVENTION LEVEL

  Called when candidate
  starts progressing again.
*/

export function resetInterventionLevel(
  session: InterviewSession
): void {
  session.interventionLevel = 0;

  updateSession(session);
}

/*
  UPDATE BEHAVIOR STATE
*/

export function updateBehavioralState(
  session: InterviewSession,
  newState: BehavioralState
): void {
  session.behavioralState =
    newState;

  updateSession(session);
}

/*
  MOVE TO NEXT STAGE
*/

export function advanceStage(
  session: InterviewSession,
  nextStage: TechnicalStage
): void {
  session.technicalStage =
    nextStage;

  /*
    Fresh stage,
    reset interventions
  */

  session.interventionLevel = 0;

  updateSession(session);
}

/*
  MARK SESSION COMPLETE
*/

export function completeSession(
  session: InterviewSession
): void {
  session.completed = true;

  updateSession(session);
}