import Link from 'next/link';

export default function PostCard({ post }) {
  const { _id, title, image, authorName, description } = post;

  return (
    <div className="overflow-hidden rounded-xl border shadow-sm">
      <img src={image} alt={title} className="h-40 w-full object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">By {authorName}</p>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">{description}</p>
        <Link href={`/community-forum/${_id}`} className="mt-3 inline-block text-orange-500">
          Read More →
        </Link>
      </div>
    </div>
  );
}