export interface InterviewScore {
  communication: number;
  understanding: number;
  algorithm: number;
  coding: number;
  debugging: number;

  overall: number;
}

export interface InterviewReport {
  summary: string;

  strengths: string[];

  weaknesses: string[];

  recommendations: string[];

  score: InterviewScore;

  timeComplexity?: string;

  spaceComplexity?: string;

  solved: boolean;

  feedback: string;
}