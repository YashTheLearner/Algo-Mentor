import type { RunResult } from "@/types/executor";

interface SubmitCodeRequest {
  interviewId: string;
  sourceCode: string;
}

interface SubmitCodeResponse {
  success: boolean;
  message: string;
  data: RunResult;
}

export async function submitCode({
  interviewId,
  sourceCode,
}: SubmitCodeRequest): Promise<SubmitCodeResponse> {
  const response = await fetch(
    `/api/interview/${interviewId}/submit`,
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

  const result =
    (await response.json()) as SubmitCodeResponse;

  if (!response.ok || !result.success) {
    throw new Error(result.message);
  }

  return result;
}