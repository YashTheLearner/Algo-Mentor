"use client";

import { useState } from "react";
import { Bot, Loader2, Send, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { InterviewMessage } from "@/types/interview-message";

interface InterviewerPanelProps {
  interviewId: string;
  initialMessages: InterviewMessage[];
}

export function InterviewerPanel({
  interviewId,
  initialMessages,
}: InterviewerPanelProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] =
    useState<InterviewMessage[]>(initialMessages);
  const [isSending, setIsSending] = useState(false);

  async function handleSend() {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isSending) {
      return;
    }

    try {
      setIsSending(true);

      const response = await fetch(
        `/api/interview/${interviewId}/message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: trimmedMessage,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        console.error("SEND_MESSAGE_ERROR", result);
        return;
      }

      setMessages((current) => [
  ...current,
  result.data.userMessage,
  result.data.aiMessage,
]);

      setMessage("");
    } catch (error) {
      console.error("SEND_MESSAGE_ERROR", error);
    } finally {
      setIsSending(false);
    }
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
            Interview conversation
          </p>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="rounded-xl border bg-muted/30 p-4">
            <p className="text-xs font-medium text-muted-foreground">
              AI Interviewer
            </p>

            <p className="mt-2 text-sm leading-6">
              Explain your understanding of the problem in your own words.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((item) => {
              const isUser = item.role === "USER";

              return (
                <div
                  key={item.id}
                  className={`flex gap-3 ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isUser && (
                    <div className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Bot className="size-4 text-primary" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-xl p-3 ${
                      isUser
                        ? "bg-primary text-primary-foreground"
                        : "border bg-muted/30"
                    }`}
                  >
                    <div className="mb-1 flex items-center gap-2">
                      {isUser ? (
                        <User className="size-3" />
                      ) : (
                        <Bot className="size-3" />
                      )}

                      <span className="text-[11px] font-medium opacity-70">
                        {isUser ? "You" : "AI Interviewer"}
                      </span>
                    </div>

                    <p className="whitespace-pre-wrap text-sm leading-6">
                      {item.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-t p-3">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey
              ) {
                event.preventDefault();
                void handleSend();
              }
            }}
            placeholder="Type your response..."
            disabled={isSending}
          />

          <Button
            size="icon"
            onClick={() => {
              void handleSend();
            }}
            disabled={!message.trim() || isSending}
            aria-label="Send message"
          >
            {isSending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}