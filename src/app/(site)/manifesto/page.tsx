import Badge from "@/app/components/ui/Badge";
import Card from "@/app/components/ui/Card";

const items = [
  { title: 'Jobs & MSMEs', desc: 'Support local entrepreneurs, skill training, microcredit transparency.' },
  { title: 'Healthcare', desc: 'Upgrade clinics, telemedicine units, emergency response.' },
  { title: 'Education', desc: 'Digital labs, teacher training, stipend expansion.' },
  { title: 'Infrastructure', desc: 'Road repair tracker, safe drinking water, drainage.' },
];

export default function Manifesto() {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {items.map(i => (
        <Card key={i.title}>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{i.title}</h3>
            <Badge>Priority</Badge>
          </div>
          <p className="mt-2 text-gray-700">{i.desc}</p>
        </Card>
      ))}
    </div>
  );
}