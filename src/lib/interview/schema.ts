import { z } from "zod";

export const interviewReportSchema = z.object({
  summary: z.string(),

  strengths: z.array(z.string()),

  weaknesses: z.array(z.string()),

  recommendations: z.array(z.string()),

  score: z.object({
    communication: z.number().min(0).max(10),
    understanding: z.number().min(0).max(10),
    algorithm: z.number().min(0).max(10),
    coding: z.number().min(0).max(10),
    debugging: z.number().min(0).max(10),
    overall: z.number().min(0).max(10),
  }),

  solved: z.boolean(),

  timeComplexity: z.string(),

  spaceComplexity: z.string(),

  feedback: z.string(),
});

export type InterviewReport =
  z.infer<typeof interviewReportSchema>;