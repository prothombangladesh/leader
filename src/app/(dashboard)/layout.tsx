import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-5 gap-6">
      <aside className="md:col-span-1 border rounded-2xl p-4 h-fit sticky top-28">
        <h2 className="font-semibold">Dashboard</h2>
        <nav className="mt-3 space-y-2 text-sm">
          <Link className="block hover:text-brand" href="/dashboard">Overview</Link>
          <Link className="block hover:text-brand" href="/dashboard/posts">Posts</Link>
        </nav>
      </aside>
      <section className="md:col-span-4">{children}</section>
    </div>
  );
}