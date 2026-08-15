import type { CodeExecutionResult, Judge0SubmissionResponse } from "@/types/executor";

export function mapJudge0Response(
  response: Judge0SubmissionResponse
): CodeExecutionResult {
  return {
    success: response.status.id === 3,
    status: response.status.description,

    stdout: response.stdout,
    stderr: response.stderr,
    compileOutput: response.compile_output,
    message: response.message,

    executionTime: response.time,
    memory: response.memory,
    exitCode: response.exit_code,
  };
}