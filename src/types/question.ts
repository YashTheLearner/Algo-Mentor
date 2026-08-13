// export type QuestionDifficulty =
//   | "Easy"
//   | "Medium"
//   | "Hard";

// export interface QuestionExample {
//   input: string;
//   output: string;
//   explanation: string;
// }

// export interface QuestionBoilerplate {
//   cpp: string;
//   java: string;
//   python: string;
//   javascript: string;
//   typescript: string;
// }

// export interface QuestionTestCase {
//   input: string;
//   expectedOutput: string;
// }

// export interface QuestionTestCases {
//   public: QuestionTestCase[];
//   hidden: QuestionTestCase[];
// }

// export interface Question {
//   id: string;
//   title: string;
//   topic: string;
//   difficulty: QuestionDifficulty;
//   description: string;

//   constraints: string[];

//   examples: QuestionExample[];

//   boilerplate: QuestionBoilerplate;

//   testCases: QuestionTestCases;
// }

// export interface PublicQuestion
//   extends Omit<Question, "testCases"> {
//   testCases: {
//     public: QuestionTestCase[];
//   };
// }

// export interface PublicQuestion {
//   id: string;
//   title: string;
//   topic: string;
//   difficulty: QuestionDifficulty;
//   description: string;
//   constraints: string[];
//   examples: QuestionExample[];
//   boilerplate: QuestionBoilerplate;
//   testCases: {
//     public: QuestionTestCase[];
//   };
// }

export type QuestionDifficulty =
  | "Easy"
  | "Medium"
  | "Hard";

export interface QuestionExample {
  input: string;
  output: string;
  explanation: string;
}

export interface QuestionBoilerplate {
  cpp: string;
  java: string;
  python: string;
  javascript: string;
  typescript: string;
}

export interface QuestionTestCase {
  input: string;
  expectedOutput: string;
}

export interface QuestionTestCases {
  public: QuestionTestCase[];
  hidden: QuestionTestCase[];
}

export interface Question {
  id: string;
  title: string;
  topic: string;
  difficulty: QuestionDifficulty;
  description: string;
  constraints: string[];
  examples: QuestionExample[];
  boilerplate: QuestionBoilerplate;
  testCases: QuestionTestCases;
}

export interface PublicQuestion {
  id: string;
  title: string;
  topic: string;
  difficulty: QuestionDifficulty;
  description: string;
  constraints: string[];
  examples: QuestionExample[];
  boilerplate: QuestionBoilerplate;
  testCases: {
    public: QuestionTestCase[];
  };
}