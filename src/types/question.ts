export type QuestionDifficulty =
  | "Easy"
  | "Medium"
  | "Hard";

export type ProgrammingLanguage =
  | "cpp"
  | "java"
  | "python"
  | "javascript"
  | "typescript";

export interface QuestionExample {
  input: string;
  output: string;
  explanation: string;
}

export interface Complexity {
  time: string;
  space: string;
}

export interface LanguageMap<T = string> {
  cpp: T;
  java: T;
  python: T;
  javascript: T;
  typescript: T;
}

export interface QuestionParameter {
  name: string;
  type: LanguageMap<string>;
}

export interface QuestionSignature {
  functionName: string;
  returnType: LanguageMap<string>;
  parameters: QuestionParameter[];
}

export interface QuestionBoilerplate
  extends LanguageMap<string> {}

// export interface QuestionTestCase {
//   arguments: unknown[];
//   expectedOutput: unknown;
// }

export interface QuestionTestCases {
  public: QuestionTestCase[];
  hidden: QuestionTestCase[];
}

export interface InterviewMetadata {
  concepts: string[];
  followUpQuestions: string[];
  commonMistakes: string[];
  hints: string[];
}

export interface Question {
  id: string;
  title: string;
  topic: string;
  difficulty: QuestionDifficulty;

  description: string;

  constraints: string[];

  examples: QuestionExample[];

  tags: string[];

  complexity: Complexity;

  signature: QuestionSignature;

  boilerplate: QuestionBoilerplate;

  testCases: QuestionTestCases;

  interview: InterviewMetadata;
}

export interface PublicQuestion
  extends Omit<Question, "testCases"> {
  testCases: {
    public: QuestionTestCase[];
  };
}
export interface QuestionTestCase {
  input?: string;
  arguments: unknown[];

  expectedOutput: unknown;

  comparison?: "exact" | "unordered" | "float";
}