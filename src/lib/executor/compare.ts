export function normalizeOutput(value: string | null): string {
  return (value ?? "")
    .trim()
    .replace(/\r\n/g, "\n");
}

export function compareOutputs(
  actual: string | null,
  expected: unknown
): boolean {
  const normalizedActual = normalizeOutput(actual);

  const normalizedExpected =
    typeof expected === "string"
      ? normalizeOutput(expected)
      : JSON.stringify(expected);

  return normalizedActual === normalizedExpected;
}