import Card from "@/app/components/ui/Card";
import { prisma } from "@/app/lib/prisma";


export default async function Events() {
  const events = await prisma.event.findMany({ orderBy: { date: 'asc' } });
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {events.map(e => (
        <Card key={e.id}>
          <h3 className="text-lg font-semibold">{e.title}</h3>
          <p className="text-gray-600 mt-1">{e.location ?? 'TBA'} • {new Date(e.date).toLocaleString()}</p>
          {e.body && <p className="mt-2 text-gray-700">{e.body}</p>}
        </Card>
      ))}
      {!events.length && <p className="text-gray-500">No events yet.</p>}
    </div>
  );
}