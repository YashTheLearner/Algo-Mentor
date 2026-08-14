import { StartInterviewRequest, StartInterviewResponse } from "@/types/interview";
import { getQuestions } from "./question";
import { storeInterviewSession } from "./redis";
import { createInterview } from "@/services/interview/create-interview";
import type { Question } from "@/types/question";
import { InterviewSession } from "@/types/interview-session";
import { prisma } from "../prisma";

interface CreateInterviewParams {
  userId: string;
  data: StartInterviewRequest;
  questions: Question[];
}

export async function startInterview(data: StartInterviewRequest, interviewId: string, userId: string) {

  console.log("START_INTERVIEW_REQUEST:", data, " ----------> ", interviewId, userId);
    const questionNo = Math.floor(Math.random() * (5));

    const questions:Question[] = await getQuestions("Arrays", "Easy");

    const interviewSession: InterviewSession = {
        "sessionId": interviewId,

        "status": "ACTIVE",

        "stage": "INTRO",

        "topic": data.topic,

        "difficulty": data.difficulty,

        "currentQuestionId": questions[questionNo].id,

        "hintsUsed": 0,

        "startedAt": Date.now(),

        "duration": data.duration * 60,

        "performance": {
            "communication": 0,
            "problemUnderstanding": 0,
            "algorithmChoice": 0,
            "coding": 0,
            "debugging": 0
        },

        "conversationSummary": "",

        "recentMessages": [],
        "code": questions[questionNo].boilerplate.cpp,
        "language": "cpp",
        
    }

    
    const interview = await createInterview({
      interviewId: interviewId,
  userId: userId,
  data,
  questions: questions[questionNo].id ? [{ id: questions[questionNo].id }] : [],
});

try{
  
await storeInterviewSession(interviewId, interviewSession, data);

}catch(error){
await prisma.interview.update({
    where: {
      id: interviewId,
    },
    data: {
      status: "ABANDONED",
    },
  });

  throw error;
}
}

// handleMessage()

// handleCode()

// finishInterview()