import { notFound } from "next/navigation";

import { getInterviewById } from "@/lib/interview/get-interview";
import { toPublicQuestion } from "@/lib/interview/question";

import { InterviewWorkspace } from "@/components/interview/interview-workspace";

interface InterviewPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function InterviewPage({
  params,
}: InterviewPageProps) {
  const { id } = await params;

  const result = await getInterviewById(id);

  if (!result) {
    notFound();
  }

  const question = toPublicQuestion(result.question);

  return (
    <InterviewWorkspace
      interviewId={id}
      question={question}
      initialCode={result.session.code}
      language={result.session.language}
      stage={result.session.stage}
      hintsUsed={result.session.hintsUsed}
    />
  );
}