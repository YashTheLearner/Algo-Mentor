import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api/auth";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ReportPage({
  params,
}: PageProps) {
  const auth = await requireAuth();

  if (!auth.success) {
    notFound();
  }

  const { id } = await params;

  const interview = await prisma.interview.findFirst({
    where: {
      id,
      userId: auth.userId,
    },
    include: {
      report: true,
    },
  });

  if (!interview || !interview.report) {
    notFound();
  }

  const report = interview.report;

  return (
    <main className="mx-auto max-w-5xl space-y-8 p-8">
      <h1 className="text-4xl font-bold">
        Interview Report
      </h1>

      <div className="rounded-lg border p-6">
        <h2 className="text-lg font-semibold">
          Overall Score
        </h2>

        <p className="mt-4 text-5xl font-bold">
          {report.overallScore ?? 0}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ScoreCard
          title="Communication"
          score={report.communicationScore ?? 0}
        />

        <ScoreCard
          title="Understanding"
          score={
            report.problemUnderstandingScore ?? 0
          }
        />

        <ScoreCard
          title="Algorithm"
          score={
            report.algorithmChoiceScore ?? 0
          }
        />

        <ScoreCard
          title="Coding"
          score={report.codingScore ?? 0}
        />

        <ScoreCard
          title="Debugging"
          score={report.debuggingScore ?? 0}
        />
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-lg font-semibold">
          Summary
        </h2>

        <p>{report.summary}</p>
      </div>
    </main>
  );
}

function ScoreCard({
  title,
  score,
}: {
  title: string;
  score: number;
}) {
  return (
    <div className="rounded-lg border p-5">
      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <p className="mt-3 text-3xl font-bold">
        {score}
      </p>
    </div>
  );
}