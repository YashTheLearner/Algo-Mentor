export type InterviewTopic =
  | "Arrays"
  | "Binary Search"
  | "Strings"
  | "Linked List"
  | "Recursion"
  | "Stack & Queue"
  | "Trees"
  | "BST"
  | "Graphs"
  | "Dynamic Programming";

export type InterviewDifficulty =
  | "easy"
  | "medium"
  | "hard";

export type InterviewMode =
  | "guided"
  | "strict";

export interface StartInterviewRequest {
  topic: InterviewTopic;
  difficulty: InterviewDifficulty;
  duration: number;
  mode: InterviewMode;
}

export interface StartInterviewResponse {
  interviewId: string;
}

export type InterviewLanguage =
  | "typescript"
  | "javascript"
  | "python"
  | "java"
  | "cpp";