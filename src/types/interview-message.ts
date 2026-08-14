import type { InterviewStage } from "@/types/interview-session";

export type MessageRole = "USER" | "AI";

export interface InterviewMessage {
  id: string;
  role: MessageRole;
  content: string;
  stage: InterviewStage;
  timestamp: number;
}

export interface SendInterviewMessageRequest {
  message: string;
}

export interface SendInterviewMessageResponse {
  message: InterviewMessage;
  stage: InterviewStage;
}