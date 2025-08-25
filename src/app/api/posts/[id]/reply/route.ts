// src/app/api/posts/[id]/reply/route.ts


import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const data = await req.json();
  const { id: postId } = await context.params; // 👈 await here

  // 👇 Only admin can reply, here just hardcode adminId
  const adminId = "ADMIN_EMAIL";

  const comment = await prisma.comment.create({
    data: {
      content: data.content,
      postId,
      authorId: adminId,
    },
  });

  return NextResponse.json(comment);
}
