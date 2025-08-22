// src/app/admin/posts/page.tsx


"use client";
import { useEffect, useState } from "react";
import Card from "@/app/components/ui/Card";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";

type Post = {
  id: string;
  title: string;
  content: string;
  comments: { id: string; content: string }[];
  createdAt: string;
};

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  async function fetchPosts() {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  async function handleReply(postId: string, form: FormData) {
    const content = form.get("content") as string;
    if (!content.trim()) return;

    await fetch(`/api/posts/${postId}/reply`, {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: { "Content-Type": "application/json" },
    });

    fetchPosts();
  }

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel – Manage Posts</h1>

      {posts.map((p) => (
        <Card key={p.id}>
          <h2 className="text-xl font-semibold">{p.title}</h2>
          <p className="mt-1">{p.content}</p>
          <p className="text-xs text-gray-500 mt-1">
            Posted: {new Date(p.createdAt).toLocaleString()}
          </p>

          {/* Show existing replies */}
          {p.comments.length > 0 && (
            <div className="mt-3 space-y-1 border-t pt-2">
              <p className="font-semibold">Your Replies:</p>
              {p.comments.map((c) => (
                <p key={c.id} className="text-gray-800">
                  • {c.content}
                </p>
              ))}
            </div>
          )}

          {/* Reply form */}
          <form
            action={(formData) => handleReply(p.id, formData)}
            className="mt-3 flex gap-2"
          >
            <Input name="content" placeholder="Write your reply…" required />
            <Button type="submit">Reply</Button>
          </form>
        </Card>
      ))}
    </div>
  );
}
