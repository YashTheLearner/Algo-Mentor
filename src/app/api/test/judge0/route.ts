import { executeCode } from "@/lib/executor/execute";

export async function GET(request: Request) {
  const result = await executeCode({
    language: "python",
    sourceCode: "print('Hello test')",
  });

  console.log(result);
  return Response.json(result);
}