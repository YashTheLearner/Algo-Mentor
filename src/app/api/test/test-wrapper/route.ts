import { NextResponse } from "next/server";

import { buildWrapper } from "@/lib/executor/wrappers";

import type { QuestionSignature } from "@/types/question";

export async function GET() {
  const signature: QuestionSignature = {
    functionName: "solve",
    returnType: {
      cpp: "int",
      java: "int",
      python: "int",
      javascript: "number",
      typescript: "number",
    },
    parameters: [
      {
        name: "nums",
        type: {
          cpp: "vector<int>",
          java: "int[]",
          python: "List[int]",
          javascript: "number[]",
          typescript: "number[]",
        },
      },
    ],
  };

  const sourceCode = `
class Solution {
public:
    int solve(vector<int> nums) {
        return nums.size();
    }
};
`;

  const wrapped = buildWrapper({
    language: "cpp",
    sourceCode,
    signature,
    arguments: [[1, 2, 3, 4]],
  });

  return NextResponse.json({
    wrapped,
  });
}