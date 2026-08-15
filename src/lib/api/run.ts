import type { RunResult } from "@/types/executor";

interface RunCodeRequest {
  interviewId: string;
  sourceCode: string;
}

interface RunCodeResponse {
  success: boolean;
  message: string;
  data: RunResult;
}

export async function runCode({
  interviewId,
  sourceCode,
}: RunCodeRequest): Promise<RunCodeResponse> {
  const response = await fetch(
    `/api/interview/${interviewId}/run`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sourceCode,
      }),
    }
  );

  const result = await response.json();
  console.log("RUN_CODE_RESPONSE", result);

  if (!response.ok || !result.success) {
    throw new Error(result.message);
  }

  return result;
}