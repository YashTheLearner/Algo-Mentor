import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

export async function GET() {
    await redis.set("hello", "world");

    return NextResponse.json({
        success: true
    });
}