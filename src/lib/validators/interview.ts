import { z } from "zod";

export const startInterviewSchema = z.object({
  topic: z.enum([
    "Arrays",
    "Binary Search",
    "Strings",
    "Linked List",
    "Recursion",
    "Stack & Queue",
    "Trees",
    "BST",
    "Graphs",
    "Dynamic Programming",
  ]),

  difficulty: z.enum(["easy", "medium", "hard"]),

  duration: z
    .number()
    .int()
    .min(15, "Duration must be at least 15 minutes")
    .max(90, "Duration cannot exceed 90 minutes"),

  mode: z.enum(["guided", "strict"]),
});

export const updateCodeSchema = z.object({
  code: z.string(),
  language: z.enum([
    "typescript",
    "javascript",
    "python",
    "java",
    "cpp",
  ]),
});