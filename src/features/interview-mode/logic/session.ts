import { InterviewSession } from "../types";

/*
  TEMP IN-MEMORY STORAGE

  This is fine for development.

  Later replace with:
  - Redis
  - Database
*/

const sessions = new Map<
  string,
  InterviewSession
>();

/*
  CREATE NEW SESSION
*/

export function createSession(
  sessionId: string
): InterviewSession {
  const session: InterviewSession = {
    sessionId,

    currentStage: "understanding",

    mode: "guided",

    hintsUsed: {
      understanding: 0,
      approach: 0,
      complexity: 0,
      coding: 0,
      review: 0,
    },

    answers: {},

    completed: false,
  };

  sessions.set(sessionId, session);

  return session;
}

/*
  GET EXISTING SESSION
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
) {
  sessions.set(session.sessionId, session);
}

/*
  DELETE SESSION
*/

export function deleteSession(
  sessionId: string
) {
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