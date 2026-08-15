import type {
  Judge0SubmissionRequest,
  Judge0SubmissionResponse,
} from "@/types/executor";

const BASE_URL = process.env.JUDGE0_BASE_URL!;
const API_KEY = process.env.RAPIDAPI_KEY!;
const API_HOST = process.env.RAPIDAPI_HOST!;

export async function submitToJudge0(
  body: Judge0SubmissionRequest
): Promise<Judge0SubmissionResponse> {
  const response = await fetch(
    `${BASE_URL}/submissions?wait=true&fields=*`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST,
      },
      body: JSON.stringify(body),
    }
  );

  const text = await response.text();

  console.log("Judge0 Status:", response.status);
  console.log("Judge0 Response:", text);

  if (!response.ok) {
    throw new Error(
      `JUDGE0_REQUEST_FAILED: ${text}`
    );
  }

  try {
    return JSON.parse(text) as Judge0SubmissionResponse;
  } catch {
    throw new Error(
      "JUDGE0_INVALID_RESPONSE"
    );
  }
}