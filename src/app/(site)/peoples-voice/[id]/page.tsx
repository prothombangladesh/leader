import Card from "@/app/components/ui/Card";
import { prisma } from "@/app/lib/prisma";

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { comments: { orderBy: { createdAt: "asc" } } },
  });

  if (!post) return <p>Not found</p>;

  type CommentType = typeof post.comments[number];

  return (
    <Card>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-gray-700 mt-2 whitespace-pre-wrap">{post.content}</p>
      <p className="text-xs text-gray-500 mt-2">
        Posted on {new Date(post.createdAt).toLocaleString()}
      </p>

      {post.comments.length ? (
        <div className="mt-5 border-t pt-3 space-y-2">
          <h3 className="font-semibold">Candidate replies</h3>
          {post.comments.map((c: CommentType) => (
            <p key={c.id} className="text-gray-800">
              • {c.content}
            </p>
          ))}
        </div>
      ) : (
        <p className="mt-5 text-gray-500">No reply yet.</p>
      )}
    </Card>
  );
}
