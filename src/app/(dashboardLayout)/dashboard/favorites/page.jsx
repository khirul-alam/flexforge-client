'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRole } from '@/hooks/useRole';
import toast from 'react-hot-toast';

export default function FavoriteClassesPage() {
  const { user } = useRole();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    if (!user) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/favorites/user/${user.email}`,
      { credentials: 'include' }
    );
    const data = await res.json();
    setFavorites(data.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const handleRemove = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/favorites/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await res.json();

    if (data.success) {
      toast.success('Removed from favorites');
      fetchFavorites();
    } else {
      toast.error(data.message || 'Failed to remove');
    }
  };

  if (loading) return null;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">My Favorite Classes</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((fav) => (
          <div key={fav._id} className="overflow-hidden rounded-xl border shadow-sm">
            <img src={fav.image} alt={fav.className} className="h-40 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">{fav.className}</h3>
              <p className="text-sm text-gray-500">Trainer: {fav.trainerName}</p>
              <p className="mt-1 font-bold text-orange-500">${fav.price}</p>

              <div className="mt-3 flex items-center justify-between">
                <Link href={`/classes/${fav.classId}`} className="text-sm text-orange-500">
                  View Details
                </Link>
                <button
                  onClick={() => handleRemove(fav._id)}
                  className="rounded-lg bg-red-500 px-3 py-1 text-xs text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        {favorites.length === 0 && (
          <p className="col-span-full text-center text-gray-400">No favorite classes yet.</p>
        )}
      </div>
    </div>
  );
}