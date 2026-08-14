import { NextResponse } from "next/server";
import { getQuestions } from "@/lib/interview/question";

export async function GET() {
    const questions = await getQuestions("Arrays", "Easy");
    return NextResponse.json({
        success: true
    });
}