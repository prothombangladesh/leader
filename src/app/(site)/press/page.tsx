import Card from "@/app/components/ui/Card";

export default function Press() {
  return (
    <Card>
      <h1 className="text-2xl font-bold">Press & Media Kit</h1>
      <ul className="list-disc ml-5 mt-3 text-gray-700 space-y-2">
        <li>Download logo (PNG, SVG)</li>
        <li>Candidate photos (Hi-Res)</li>
        <li>One-pager manifesto (PDF)</li>
        <li>Media contact: media@example.com</li>
      </ul>
    </Card>
  );
}