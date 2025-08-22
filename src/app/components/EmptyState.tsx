export default function EmptyState({ title = 'Nothing yet', subtitle }: { title?: string; subtitle?: string }) {
  return (
    <div className="text-center text-gray-500 py-10">
      <h3 className="text-lg font-semibold">{title}</h3>
      {subtitle && <p className="mt-1">{subtitle}</p>}
    </div>
  );
}