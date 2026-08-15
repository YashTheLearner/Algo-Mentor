import { submitToJudge0 } from "@/lib/executor/client";
import { getJudge0LanguageId } from "@/lib/executor/language";
import { mapJudge0Response } from "@/lib/executor/mapper";

import type {
  CodeExecutionResult,
  ExecuteCodeRequest,
  Judge0SubmissionRequest,
} from "@/types/executor";

export async function executeCode({
  language,
  sourceCode,
}: ExecuteCodeRequest): Promise<CodeExecutionResult> {
  if (!sourceCode.trim()) {
    throw new Error("EMPTY_SOURCE_CODE");
  }

  const body: Judge0SubmissionRequest = {
    language_id: getJudge0LanguageId(language),
    source_code: sourceCode,
  };

  const response = await submitToJudge0(body);

  return mapJudge0Response(response);
}