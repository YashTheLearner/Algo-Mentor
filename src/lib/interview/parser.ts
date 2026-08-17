import {
  interviewReportSchema,
} from "./schema";

export function parseInterviewReport(
  response: string
) {
  const json = JSON.parse(response);

  return interviewReportSchema.parse(json);
}