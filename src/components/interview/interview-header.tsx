import { Clock3, Flag, Lightbulb } from "lucide-react";

import { Button } from "@/components/ui/button";

interface InterviewHeaderProps {
  title: string;
  topic: string;
  difficulty: string;
  stage: string;
  hintsUsed: number;
}

export function InterviewHeader({
  title,
  topic,
  difficulty,
  stage,
  hintsUsed,
}: InterviewHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-5">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="truncate text-sm font-semibold">
            {title}
          </h1>

          <span className="rounded-md bg-primary/10 px-2 py-1 text-[11px] font-medium text-primary">
            {difficulty}
          </span>
        </div>

        <p className="mt-1 text-xs text-muted-foreground">
          {topic} · {stage}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-md border px-3 py-2 text-xs md:flex">
          <Clock3 className="size-4" />
          30:00
        </div>

        <div className="hidden items-center gap-2 rounded-md border px-3 py-2 text-xs sm:flex">
          <Lightbulb className="size-4" />
          Hints: {hintsUsed}
        </div>

        <Button
          variant="destructive"
          size="sm"
        >
          <Flag className="size-4" />
          End Interview
        </Button>
      </div>
    </header>
  );
}