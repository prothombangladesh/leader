// src/app/api/posts/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    include: { comments: true },
  });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const post = await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      category: data.category,
      authorId: null, // public user
    },
  });

  return NextResponse.json(post);
}
