import type { PublicQuestion } from "@/types/question";

interface ProblemPanelProps {
  question: PublicQuestion;
}

export function ProblemPanel({ question }: ProblemPanelProps) {
  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border bg-card">
      <div className="border-b px-5 py-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Problem
        </p>

        <h1 className="mt-1 text-xl font-semibold">
          {question.title}
        </h1>

        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            {question.topic}
          </span>

          <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
            {question.difficulty}
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
        <div className="space-y-8">
          <section>
            <h2 className="mb-3 font-semibold">Description</h2>

            <p className="text-sm leading-7 text-muted-foreground">
              {question.description}
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-semibold">Constraints</h2>

            <ul className="space-y-2">
              {question.constraints.map((constraint) => (
                <li
                  key={constraint}
                  className="text-sm leading-6 text-muted-foreground"
                >
                  • {constraint}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-semibold">Examples</h2>

            <div className="space-y-4">
              {question.examples.map((example, index) => (
                <div
                  key={`${question.id}-example-${index}`}
                  className="rounded-lg border bg-muted/20 p-4"
                >
                  <p className="text-xs font-medium text-muted-foreground">
                    Example {index + 1}
                  </p>

                  <div className="mt-3 space-y-3 text-sm">
                    <div>
                      <span className="font-medium">Input:</span>
                      <pre className="mt-1 overflow-x-auto rounded-md bg-background p-3 font-mono text-xs">
                        {example.input}
                      </pre>
                    </div>

                    <div>
                      <span className="font-medium">Output:</span>
                      <pre className="mt-1 overflow-x-auto rounded-md bg-background p-3 font-mono text-xs">
                        {example.output}
                      </pre>
                    </div>

                    <p className="leading-6 text-muted-foreground">
                      {example.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}