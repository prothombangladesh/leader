import Card from '@/app/components/ui/Card';
import { prisma } from '../../lib/prisma';
import Button from '@/app/components/ui/Button';

async function replyAction(formData: FormData) {
  'use server';
  const { prisma } = await import('../../lib/prisma');
  const postId = formData.get('postId') as string;
  const content = (formData.get('content') as string)?.trim();
  if (!postId || !content) return;
  await prisma.comment.create({ data: { postId, content } });
}

async function toggleVisibility(formData: FormData) {
  'use server';
  const { prisma } = await import('../../lib/prisma');
  const postId = formData.get('postId') as string;
  const hide = formData.get('hide') === 'true';
  await prisma.post.update({
    where: { id: postId },
    data: { status: hide ? 'HIDDEN' : 'PUBLISHED' },
  });
}

export default async function AdminPosts() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: { comments: true },
  });

  type CommentType = typeof posts[number]['comments'][number];
  type PostType = typeof posts[number];

  return (
    <div className="space-y-4">
      {posts.map((p: PostType) => (
        <Card key={p.id}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(p.createdAt).toLocaleString()} • {p.status}
              </p>
              <p className="mt-2 text-gray-800 whitespace-pre-wrap">{p.content}</p>

              {p.comments.length > 0 && (
                <div className="mt-3 text-sm text-gray-700 space-y-1">
                  {p.comments.map((c: CommentType) => (
                    <p key={c.id}>• {c.content}</p>
                  ))}
                </div>
              )}
            </div>

            <form action={toggleVisibility} className="text-right">
              <input type="hidden" name="postId" value={p.id} />
              <input
                type="hidden"
                name="hide"
                value={p.status === 'PUBLISHED' ? 'true' : 'false'}
              />
              <Button type="submit">
                {p.status === 'PUBLISHED' ? 'Hide' : 'Publish'}
              </Button>
            </form>
          </div>

          <form action={replyAction} className="mt-4 flex gap-2">
            <input type="hidden" name="postId" value={p.id} />
            <input
              name="content"
              placeholder="Write a reply..."
              className="flex-1 border rounded-xl2 px-3 py-2"
            />
            <Button type="submit">Reply</Button>
          </form>
        </Card>
      ))}

      {!posts.length && <p className="text-gray-500">No posts yet.</p>}
    </div>
  );
}
