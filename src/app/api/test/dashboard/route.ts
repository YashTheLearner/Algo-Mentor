import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await getServerSession(authOptions);

  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  const interview = await prisma.interview.create({
    data: {
      userId: user.id,

      topic: "Arrays",
      difficulty: "Medium",
      mode: "GUIDED",

      duration: 30,
      questionCount: 5,

      status: "COMPLETED",

      startedAt: new Date(
        Date.now() - 2 * 24 * 60 * 60 * 1000
      ),

      completedAt: new Date(
        Date.now() - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000
      ),

      report: {
        create: {
          userId: user.id,

          overallScore: 78,

          communicationScore: 82,
          problemUnderstandingScore: 76,
          algorithmChoiceScore: 80,
          codingScore: 74,
          debuggingScore: 79,

          strengths: [
            "Clear communication",
            "Good problem understanding",
          ],

          weaknesses: [
            "Could improve coding speed",
          ],

          recommendations: [
            "Practice explaining solutions while coding",
          ],

          summary:
            "Good overall performance with room for improvement in coding speed.",

          durationSeconds: 1800,

          solved: true,

          language: "cpp",
        },
      },
    },

    select: {
      id: true,
      topic: true,
      difficulty: true,
      status: true,
    },
  });

  return NextResponse.json({
    success: true,
    interview,
  });
}