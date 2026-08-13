// lib/questions.ts

import { promises as fs } from "fs";
import path from "path";

export async function getQuestions(
  topic: string,
  difficulty: string
) {
  console.log(process.cwd());
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "questions",
      topic,
      `${difficulty}.json`
    );

    const file = await fs.readFile(filePath, "utf-8");

    return JSON.parse(file);
  } catch (error) {
    throw new Error(
      `Questions not found for ${topic}/${difficulty}`
    );
  }
}