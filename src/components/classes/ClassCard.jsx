import Link from 'next/link';

export default function ClassCard({ classData }) {
  const { _id, className: name, image, trainerName, category, price, duration, bookingCount } =
    classData;

  return (
    <div className="overflow-hidden rounded-xl border shadow-sm">
      <img src={image} alt={name} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">Trainer: {trainerName}</p>
        <p className="text-sm text-gray-500">{category} • {duration}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold text-orange-500">${price}</span>
          <span className="text-xs text-gray-400">{bookingCount || 0} booked</span>
        </div>
        <Link
          href={`/classes/${_id}`}
          className="mt-4 block rounded-lg bg-orange-500 py-2 text-center font-medium text-white"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}