import { z } from "zod";

export const executeCodeSchema = z.object({
  sourceCode: z
    .string()
    .trim()
    .min(1)
    .max(100_000),
});

export type ExecuteCodeInput = z.infer<
  typeof executeCodeSchema
>;