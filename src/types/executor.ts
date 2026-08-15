export type ProgrammingLanguage =
  | "typescript"
  | "javascript"
  | "python"
  | "java"
  | "cpp";

export interface ExecuteCodeRequest {
  language: ProgrammingLanguage;
  sourceCode: string;
}

export interface Judge0SubmissionRequest {
  language_id: number;
  source_code: string;
  stdin?: string;
}

export interface Judge0SubmissionResponse {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  time: string | null;
  memory: number | null;
  exit_code: number | null;

  status: {
    id: number;
    description: string;
  };
}

/**
 * Result of executing one piece of code once.
 */
export interface CodeExecutionResult {
  success: boolean;
  status: string;

  stdout: string | null;
  stderr: string | null;
  compileOutput: string | null;
  message: string | null;

  executionTime: string | null;
  memory: number | null;
  exitCode: number | null;
}

/**
 * Result of executing one public test case.
 */
export interface TestCaseResult {
  input: string;
  expectedOutput: string;

  actualOutput: string | null;
  passed: boolean;

  executionTime: string | null;
  memory: number | null;

  error: string | null;
}

/**
 * Aggregated result returned by the Run API.
 */
export interface RunResult {
  mode: "run"|"submit";

  passed: number;
  total: number;
  accepted: boolean;

  testCases: TestCaseResult[];
}