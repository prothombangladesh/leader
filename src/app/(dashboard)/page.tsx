import Card from "../components/ui/Card";
import { prisma } from "../lib/prisma";


export default async function DashboardHome() {
  const [posts, comments] = await Promise.all([
    prisma.post.count(),
    prisma.comment.count()
  ]);
  return (
    <div className="grid md:grid-cols-3 gap-5">
      <Card><h3 className="text-lg font-semibold">Total Posts</h3><p className="text-3xl mt-2">{posts}</p></Card>
      <Card><h3 className="text-lg font-semibold">Replies</h3><p className="text-3xl mt-2">{comments}</p></Card>
      <Card><h3 className="text-lg font-semibold">Status</h3><p className="mt-2 text-gray-700">All systems nominal.</p></Card>
    </div>
  );
}