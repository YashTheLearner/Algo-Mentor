/*
  SESSION TYPE
*/

export type SessionType =
  | "practice"
  | "mock";

/*
  TECHNICAL INTERVIEW STAGE
*/

export type TechnicalStage =
  | "problem_understanding"
  | "approach"
  | "implementation"
  | "debugging"
  | "complexity"
  | "optimization"
  | "review";

/*
  BEHAVIORAL STATE
*/

export type BehavioralState =
  | "progressing"
  | "stalled"
  | "silent"
  | "confused"
  | "looping"
  | "recovering";

/*
  INTERVENTION LEVEL
*/

export type InterventionLevel =
  | 0
  | 1
  | 2
  | 3
  | 4;

/*
  CANDIDATE EVENT
*/

export type CandidateEventType =
  | "candidate_message"
  | "idle_timeout"
  | "hint_request"
  | "code_submission"
  | "stage_completed";

/*
  CANDIDATE EVENT
*/

export interface CandidateEvent {
  type: CandidateEventType;

  timestamp: number;

  content?: string;
}

/*
  INTERVIEW MEMORY
*/

export interface CandidateMemory {
  reasoningHistory: string[];

  mistakes: string[];

  interventionsUsed: number;

  strengths: string[];
}

/*
  INTERVIEW SESSION
*/

export interface InterviewSession {
  sessionId: string;

  sessionType: SessionType;

  technicalStage: TechnicalStage;

  behavioralState: BehavioralState;

  interventionLevel: InterventionLevel;

  score: number;

  currentQuestionId: string;

  memory: CandidateMemory;

  eventHistory: CandidateEvent[];

  startedAt: number;

  lastInteractionAt: number;

  completed: boolean;
}
/*
  API ACTIONS
*/

export type InterviewAction =
  | "start"
  | "event"
  | "state";

/*
  API REQUEST
*/

export interface InterviewRequest {
  action: InterviewAction;

  sessionId: string;

  sessionType?: SessionType;

  event?: CandidateEvent;
}