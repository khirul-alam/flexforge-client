export default function StatsCard({ title, value, icon }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-3xl font-bold text-orange-500">{value}</p>
    </div>
  );
}