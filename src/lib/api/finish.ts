export async function finishInterview(
  interviewId: string
) {
  const response = await fetch(
    `/api/interview/${interviewId}/finish`,
    {
      method: "POST",
    }
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message);
  }

  return result;
}