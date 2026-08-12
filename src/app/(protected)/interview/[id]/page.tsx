import { notFound } from "next/navigation";

interface InterviewPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function InterviewPage({
  params,
}: InterviewPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">
            Interview Session
          </p>

          <h1 className="mt-1 text-2xl font-semibold">
            Your interview is ready
          </h1>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Interview ID
          </p>

          <p className="mt-2 break-all font-mono text-sm">
            {id}
          </p>
        </div>
      </div>
    </main>
  );
}