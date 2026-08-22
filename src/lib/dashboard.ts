import { prisma } from "@/lib/prisma";

function average(values: (number | null)[]) {
  const validValues = values.filter(
    (value): value is number => value !== null
  );

  if (validValues.length === 0) {
    return 0;
  }

  return Math.round(
    validValues.reduce((sum, value) => sum + value, 0) /
      validValues.length
  );
}

export async function getDashboardData(email: string) {
  // ----------------------------------------
  // Find current user
  // ----------------------------------------

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // ----------------------------------------
  // Fetch dashboard data
  // ----------------------------------------

  const [interviews, reports] = await Promise.all([
    // Recent interviews
    prisma.interview.findMany({
      where: {
        userId: user.id,
      },

      orderBy: {
        startedAt: "desc",
      },

      take: 5,

      select: {
        id: true,
        topic: true,
        difficulty: true,
        status: true,
        startedAt: true,

        report: {
          select: {
            overallScore: true,
          },
        },
      },
    }),

    // Reports used for performance calculations
    prisma.report.findMany({
      where: {
        userId: user.id,
        overallScore: {
          not: null,
        },
      },

      orderBy: {
        createdAt: "asc",
      },

      select: {
        overallScore: true,

        communicationScore: true,
        problemUnderstandingScore: true,
        algorithmChoiceScore: true,
        codingScore: true,
        debuggingScore: true,

        createdAt: true,
      },
    }),
  ]);

  // ----------------------------------------
  // Overall scores
  // ----------------------------------------

  const validScores = reports
    .map((report) => report.overallScore)
    .filter(
      (score): score is number => score !== null
    );

  // Average score across all completed interviews
  const averageScore = average(validScores);

  // ----------------------------------------
  // Improvement
  // ----------------------------------------

  const latestScore = validScores.at(-1) ?? null;

  const previousScore =
    validScores.at(-2) ?? null;

  // Difference between latest and previous interview
  const improvement =
    latestScore !== null &&
    previousScore !== null
      ? latestScore - previousScore
      : null;

  // ----------------------------------------
  // Performance breakdown
  // ----------------------------------------

  const performance = {
    communication: average(
      reports.map(
        (report) => report.communicationScore
      )
    ),

    problemUnderstanding: average(
      reports.map(
        (report) =>
          report.problemUnderstandingScore
      )
    ),

    algorithmChoice: average(
      reports.map(
        (report) => report.algorithmChoiceScore
      )
    ),

    coding: average(
      reports.map(
        (report) => report.codingScore
      )
    ),

    debugging: average(
      reports.map(
        (report) => report.debuggingScore
      )
    ),
  };

  // ----------------------------------------
  // Return dashboard data
  // ----------------------------------------
  // console.log("DASHBOARD REPORTS:", reports);
  // console.log("---------------->",improvement,"<------------");

  return {
    recentInterviews: interviews,

    progress: {
      totalInterviews: reports.length,
      averageScore,
      improvement,
    },

    performance,
  };
}