// app/api/polls/[id]/vote/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // if using next-auth getServerSession
import { differenceInDays } from "date-fns";

export async function POST(req: Request, { params }: { params: { id: string }}) {
  try {
    const pollId = Number(params.id);
    if (Number.isNaN(pollId)) return NextResponse.json({ error: "Invalid poll id" }, { status: 400 });

    // get client IP (best-effort — proxied environments set x-forwarded-for)
    const xff = req.headers.get("x-forwarded-for") || "";
    const ip = xff.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";

    // read body: { optionId }
    const body = await req.json();
    const optionId = Number(body.optionId);
    if (!optionId) return NextResponse.json({ error: "optionId required" }, { status: 400 });

    // if using NextAuth session:
    const session = await getServerSession(authOptions as any);
    const userId = session?.user?.id ? Number(session.user.id) : null;

    // require member + verification
    if (!userId) return NextResponse.json({ error: "Authentication required" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { id: userId }});
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    if (user.role === "GUEST") return NextResponse.json({ error: "Be a member to vote" }, { status: 403 });
    if (!user.emailVerified || !user.phoneVerified) return NextResponse.json({ error: "Please verify email & phone", status: 403 });

    // Check if poll exists and is active
    const poll = await prisma.poll.findUnique({ where: { id: pollId }});
    if (!poll) return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    const now = new Date();
    if (poll.startDate > now || poll.endDate < now) {
      // you can adjust: allow voting only during active window
      return NextResponse.json({ error: "Poll is not active" }, { status: 403 });
    }

    // Check last vote by user for this poll
    const lastUserVote = await prisma.vote.findFirst({
      where: { pollId: pollId, userId: userId },
      orderBy: { votedAt: "desc" },
    });

    if (lastUserVote) {
      const daysSince = (now.getTime() - lastUserVote.votedAt.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince < 7) {
        return NextResponse.json({ error: `You already voted ${Math.floor(daysSince)} day(s) ago. Wait ${Math.ceil(7 - daysSince)} day(s).`}, { status: 403 });
      }
    }

    // Check last vote by IP for this poll
    const lastIpVote = await prisma.vote.findFirst({
      where: { pollId: pollId, ip: ip },
      orderBy: { votedAt: "desc" },
    });
    if (lastIpVote) {
      const daysSinceIp = (now.getTime() - lastIpVote.votedAt.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceIp < 7) {
        return NextResponse.json({ error: `This IP already voted ${Math.floor(daysSinceIp)} day(s) ago. Wait ${Math.ceil(7 - daysSinceIp)} day(s).`}, { status: 403 });
      }
    }

    // Create vote
    await prisma.vote.create({
      data: {
        pollId,
        optionId,
        userId,
        ip,
        votedAt: new Date(),
      }
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
