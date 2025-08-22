// src/app/peoples-voice/page.tsx
import Button from '@/app/components/ui/Button';
import Card from '@/app/components/ui/Card';
import Input from '@/app/components/ui/Input';
import Textarea from '@/app/components/ui/Textarea';
import { prisma } from '@/app/lib/prisma';
import Link from 'next/link';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(5),
  content: z.string().min(20),
  name: z.string().optional(),
  phone: z.string().optional(),
  category: z
    .enum([
      'GENERAL',
      'INFRASTRUCTURE',
      'HEALTH',
      'EDUCATION',
      'JOBS',
      'AGRICULTURE',
      'SECURITY',
      'OTHER',
    ])
    .default('GENERAL'),
});

export default async function PeoplesVoice() {
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' },
    include: { comments: { orderBy: { createdAt: 'asc' } } },
    take: 20,
  });

  type PostWithComments = typeof posts[number];

  async function createPost(formData: FormData) {
    'use server';
    // convert FormData to Record<string, string>
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (typeof value === 'string') data[key] = value;
    });

    const parsed = schema.safeParse(data);
    if (!parsed.success) return;

    const { name, phone, title, content, category } = parsed.data;

    let userId: string | undefined = undefined;
    if (name || phone) {
      const user = await prisma.user.upsert({
        where: { phone: phone ?? `anon-${Date.now()}` },
        create: { name, phone },
        update: { name },
      });
      userId = user.id;
    }

    await prisma.post.create({
      data: { title, content, category, authorId: userId },
    });
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card>
        <h2 className="text-xl font-semibold">Share your problem/advice</h2>
        <form action={createPost} className="mt-4 space-y-3">
          <Input
            name="title"
            placeholder="Short title (e.g., Road repair at Ward 4)"
            required
          />
          <Textarea
            name="content"
            placeholder="Explain the issue in detail..."
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input name="name" placeholder="Your name (optional)" />
            <Input name="phone" placeholder="Phone (optional)" />
          </div>
          <select
            name="category"
            className="w-full border rounded-xl2 px-3 py-2"
          >
            {[
              'GENERAL',
              'INFRASTRUCTURE',
              'HEALTH',
              'EDUCATION',
              'JOBS',
              'AGRICULTURE',
              'SECURITY',
              'OTHER',
            ].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <Button type="submit">Submit</Button>
        </form>
      </Card>

      <div className="md:col-span-2 space-y-4">
        {posts.map((p: PostWithComments) => (
          <Card key={p.id}>
            <Link href={`/peoples-voice/${p.id}`} className="block">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-gray-700 mt-1 line-clamp-3">{p.content}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(p.createdAt).toLocaleString()}
              </p>
            </Link>
            {p.comments.length > 0 && (
              <div className="mt-3 border-t pt-3">
                <p className="text-sm font-medium">Candidate replies:</p>
                {p.comments.map(
                  (c: typeof p.comments[number]) => (
                    <p
                      key={c.id}
                      className="text-sm text-gray-700 mt-1"
                    >
                      • {c.content}
                    </p>
                  )
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
