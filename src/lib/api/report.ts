import type {
  Interview,
  Report,
} from "@prisma/client";

interface ReportResponse {
  success: boolean;

  data: Interview & {
    report: Report | null;
  };
}

export async function getReport(
  interviewId: string
) {
  const response = await fetch(
    `/api/interview/${interviewId}/report`
  );

  const result: ReportResponse =
    await response.json();

  if (!response.ok) {
    throw new Error("Unable to load report.");
  }

  return result.data;
}