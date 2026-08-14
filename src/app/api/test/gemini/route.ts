import { NextResponse } from "next/server";

import {
  gemini,
  GEMINI_MODEL,
} from "@/lib/gemini";

export async function GET() {
  try {
    const response = await gemini.models.generateContent({
      model: GEMINI_MODEL,
      contents: "Reply with exactly: GEMINI_OK",
    });

    return NextResponse.json({
      success: true,
      data: {
        text: response.text,
        model: GEMINI_MODEL,
      },
    });
  } catch (error) {
    console.error("GEMINI_TEST_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gemini request failed.",
      },
      { status: 500 }
    );
  }
}