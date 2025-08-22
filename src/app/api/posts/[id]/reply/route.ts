import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();
  const postId = params.id;

  // 👇 Only admin can reply, here just hardcode adminId
  const adminId = "YOUR_ADMIN_USER_ID";

  const comment = await prisma.comment.create({
    data: {
      content: data.content,
      postId,
      authorId: adminId,
    },
  });

  return NextResponse.json(comment);
}
