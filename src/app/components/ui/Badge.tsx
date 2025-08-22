export default function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{children}</span>;
}