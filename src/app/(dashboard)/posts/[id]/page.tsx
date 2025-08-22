import Card from "@/app/components/ui/Card";
import { prisma } from "@/app/lib/prisma";

export default async function PostAdminDetail({
  params,
}: {
  params: { id: string };
}) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { comments: true },
  });

  if (!post) return <p>Not found</p>;

  type CommentType = typeof post.comments[number];

  return (
    <Card>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="mt-2 text-gray-700">{post.content}</p>

      <div className="mt-4 space-y-2">
        {post.comments.map((c: CommentType) => (
          <p key={c.id}>• {c.content}</p>
        ))}
      </div>
    </Card>
  );
}
