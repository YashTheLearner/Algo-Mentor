"use client";

import { Bot, Send } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function InterviewerPanel() {
  const [message, setMessage] = useState("");

  function handleSend() {
    const trimmed = message.trim();

    if (!trimmed) {
      return;
    }

    console.log("Candidate message:", trimmed);

    setMessage("");
  }

  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center gap-3 border-b px-5 py-4">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
          <Bot className="size-5 text-primary" />
        </div>

        <div>
          <h2 className="font-semibold">AI Interviewer</h2>
          <p className="text-xs text-muted-foreground">
            Guided interview
          </p>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <div className="max-w-[90%] rounded-xl border bg-muted/30 p-4">
            <p className="text-xs font-medium text-muted-foreground">
              AI Interviewer
            </p>

            <p className="mt-2 text-sm leading-6">
              Let's begin by making sure you understand the problem.
              Explain it back to me in your own words.
            </p>
          </div>

          <div className="ml-auto max-w-[90%] rounded-xl bg-primary/10 p-4">
            <p className="text-xs font-medium text-primary">
              You
            </p>

            <p className="mt-2 text-sm leading-6">
              I need to rotate the array to the right by k positions.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t p-3">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your response..."
          />

          <Button
            size="icon"
            onClick={handleSend}
            disabled={!message.trim()}
            aria-label="Send message"
          >
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}