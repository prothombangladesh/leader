// src/app/(site)/peoples-voice/page.tsx


"use client"; // use client component for form interactivity
import { useState } from "react";
import Card from "@/app/components/ui/Card";
import Input from "@/app/components/ui/Input";
import Textarea from "@/app/components/ui/Textarea";
import { z } from "zod";
import Button from "@/app/components/ui/Button";

const schema = z.object({
  title: z.string().min(5),
  content: z.string().min(10),
  name: z.string().optional(),
  phone: z.string().optional(),
  category: z.enum([
    "GENERAL",
    "INFRASTRUCTURE",
    "HEALTH",
    "EDUCATION",
    "JOBS",
    "AGRICULTURE",
    "SECURITY",
    "OTHER",
  ]),
});

// ✅ Define types
interface Comment {
  id: string;
  content: string;
  createdAt: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  comments: Comment[];
}

export default function PeoplesVoicePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // fetch posts from backend
  async function fetchPosts() {
    const res = await fetch("/api/posts");
    const data: Post[] = await res.json();
    setPosts(data);
  }

  // fetch posts on page load
  if (posts.length === 0 && !loading) fetchPosts();

  // form submit
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const data: Record<string, FormDataEntryValue> = {};
    form.forEach((value, key) => {
      data[key] = value;
    });

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      setError("সব ফিল্ড সঠিকভাবে পূরণ করুন।");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(parsed.data),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      e.currentTarget.reset();
      await fetchPosts();
    } else {
      setError("পোস্টটি তৈরি করা যায়নি।");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">
        আপনার সমস্যা বা পরামর্শ শেয়ার করুন
      </h1>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input name="title" placeholder="সংক্ষিপ্ত শিরোনাম" required />
          <Textarea
            name="content"
            placeholder="আপনার সমস্যা/পরামর্শ লিখুন"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input name="name" placeholder="আপনার নাম (ঐচ্ছিক)" />
            <Input name="phone" placeholder="ফোন নম্বর (ঐচ্ছিক)" />
          </div>
          <select
            name="category"
            className="w-full border rounded-xl px-3 py-2"
          >
            {[
              "GENERAL",
              "INFRASTRUCTURE",
              "HEALTH",
              "EDUCATION",
              "JOBS",
              "AGRICULTURE",
              "SECURITY",
              "OTHER",
            ].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {error && <p className="text-red-600">{error}</p>}
          <Button className="text-gray-900" type="submit" disabled={loading}>
            {loading ? "আপলোড হচ্ছে..." : "পোস্ট করুন"}
          </Button>
        </form>
      </Card>

      <div className="space-y-4">
        {posts.map((p) => (
          <Card key={p.id}>
            <h3 className="text-xl font-semibold">{p.title}</h3>
            <p className="text-gray-700 mt-1 whitespace-pre-wrap">
              {p.content}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              পোস্ট হয়েছে: {new Date(p.createdAt).toLocaleString("bn-BD")}
            </p>
            {p.comments.length > 0 && (
              <div className="mt-3 border-t pt-2 space-y-1">
                <p className="font-semibold">প্রশাসনের উত্তর:</p>
                {p.comments.map((c) => (
                  <p key={c.id} className="text-gray-800">
                    • {c.content}
                  </p>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
