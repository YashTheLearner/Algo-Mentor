import { z } from "zod";

export const interviewReportSchema = z.object({
  overallScore: z
    .number()
    .int()
    .min(0)
    .max(100),

  communicationScore: z
    .number()
    .int()
    .min(0)
    .max(100),

  problemUnderstandingScore: z
    .number()
    .int()
    .min(0)
    .max(100),

  algorithmChoiceScore: z
    .number()
    .int()
    .min(0)
    .max(100),

  codingScore: z
    .number()
    .int()
    .min(0)
    .max(100),

  debuggingScore: z
    .number()
    .int()
    .min(0)
    .max(100),

  strengths: z
    .array(z.string().min(1))
    .min(1)
    .max(5),

  weaknesses: z
    .array(z.string().min(1))
    .min(1)
    .max(5),

  recommendations: z
    .array(z.string().min(1))
    .min(1)
    .max(5),

  summary: z
    .string()
    .min(30)
    .max(1000),
});

export type InterviewReport = z.infer<
  typeof interviewReportSchema
>;