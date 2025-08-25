// src/app/admin/login/page.tsx 

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/admin/posts");
    } else {
      setError("Invalid email or password");
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4">Admin Login</h1>
      <form action={handleLogin} className="space-y-3">
        <Input
          name="email"
          type="email"
          placeholder="Admin email"
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
