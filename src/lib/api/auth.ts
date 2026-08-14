import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { ErrorCode } from "@/lib/errors";

export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      success: false as const,
      error: {
        code: ErrorCode.UNAUTHORIZED,
        message: "Authentication required.",
      },
    };
  }

  return {
    success: true as const,
    userId: session.user.id,
    session,
  };
}