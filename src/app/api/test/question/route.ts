import { NextResponse } from "next/server";
import { getQuestions } from "@/lib/interview/questions";

export async function GET() {
    const questions = await getQuestions("Arrays", "Easy");
    console.log(questions);

    return NextResponse.json({
        success: true
    });
}