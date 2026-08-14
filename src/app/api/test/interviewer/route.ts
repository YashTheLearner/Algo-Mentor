import { NextResponse } from "next/server";

import { runInterviewerEngine } from "@/services/interview/interviewer-engine";
import type { InterviewMessage } from "@/types/interview-message";
import type { InterviewSession } from "@/types/interview-session";

export async function GET() {
  try {
    const session: InterviewSession = {
      sessionId: "test-session",
      status: "ACTIVE",
      stage: "INTRO",
      topic: "Arrays",
      difficulty: "medium",
      currentQuestionId: "arrays_easy_001",
      hintsUsed: 0,
      startedAt: Date.now(),
      duration: 1800,

      performance: {
        communication: 0,
        problemUnderstanding: 0,
        algorithmChoice: 0,
        coding: 0,
        debugging: 0,
      },

      conversationSummary: "",
      recentMessages: [],

      code: "class Solution {}",
      language: "typescript",
    };

    const messages: InterviewMessage[] = [];

    const decision = await runInterviewerEngine({
      session,
      messages,
      question: {
        title: "Rotate Array to the Right",
        description:
          "Given an integer array nums, rotate the array to the right by k steps.",
        constraints: [
          "1 <= nums.length <= 10^5",
          "0 <= k <= 10^5",
        ],
        examples: [
          {
            input: "nums = [1,2,3,4,5], k = 2",
            output: "[4,5,1,2,3]",
            explanation:
              "Rotating right by two positions moves the last two elements to the front.",
          },
        ],
      },
      candidateMessage:
        // "I understand that I need to move the last k elements to the beginning while keeping their order."
        "I would just use an extra array and copy the elements around."
        ,
    });

    return NextResponse.json({
      success: true,
      data: decision,
    });
  } catch (error) {
    console.error("INTERVIEWER_TEST_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "Interviewer engine test failed.",
      },
      { status: 500 }
    );
  }
}