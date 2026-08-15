import type { QuestionSignature } from "@/types/question";

import { CPP_SERIALIZER } from "../serializer/cpp";

interface BuildCppWrapperOptions {
  sourceCode: string;
  signature: QuestionSignature;
  arguments: unknown[];
}

function normalizeCppType(type: string): string {
  return type
    .replace(/\bconst\b/g, "")
    .replace(/&/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function serializeArgument(value: unknown): string {
  if (Array.isArray(value)) {
    return `{${value.map(serializeArgument).join(", ")}}`;
  }

  if (typeof value === "string") {
    return `"${value}"`;
  }

  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }

  return String(value);
}

export function buildCppWrapper({
  sourceCode,
  signature,
  arguments: args,
}: BuildCppWrapperOptions): string {
  const declarations = signature.parameters
    .map((parameter, index) => {
      const type = normalizeCppType(parameter.type.cpp);
      const value = serializeArgument(args[index]);

      return `${type} ${parameter.name} = ${value};`;
    })
    .join("\n");

  const callArguments = signature.parameters
    .map((parameter) => parameter.name)
    .join(", ");

  return `
#include <bits/stdc++.h>
using namespace std;

${CPP_SERIALIZER}

${sourceCode}

int main() {

${declarations}

    Solution solution;

    auto result = solution.${signature.functionName}(${callArguments});

    printValue(result);

    return 0;
}
`;
}