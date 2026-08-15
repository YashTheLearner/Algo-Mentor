import { buildCppWrapper } from "./cpp";

import type {
  ProgrammingLanguage,
  QuestionSignature,
} from "@/types/question";

interface BuildWrapperOptions {
  language: ProgrammingLanguage;

  sourceCode: string;

  signature: QuestionSignature;

  arguments: unknown[];
}

export function buildWrapper({
  language,
  sourceCode,
  signature,
  arguments: args,
}: BuildWrapperOptions): string {
  switch (language) {
    case "cpp":
      return buildCppWrapper({
        sourceCode,
        signature,
        arguments: args,
      });

    default:
      throw new Error(
        `Wrapper not implemented for ${language}`
      );
  }
}