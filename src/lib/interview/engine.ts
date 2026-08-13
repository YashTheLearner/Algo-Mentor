import { StartInterviewRequest, StartInterviewResponse } from "@/types/interview";
import { getQuestions } from "./questions";
import { storeInterviewSession } from "./redis";


export async function startInterview(data: StartInterviewRequest, interviewId: string) {

    const questionNo = Math.floor(Math.random() * (5));

    const questions = await getQuestions("Arrays", "Easy");

    const interviewSession = {
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

        "recentMessages": []
    }
    console.log(interviewSession);

    await storeInterviewSession(interviewId, interviewSession, data);


}

// handleMessage()

// handleCode()

// finishInterview()