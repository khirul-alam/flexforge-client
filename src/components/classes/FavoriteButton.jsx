'use client';

import { useEffect, useState } from 'react';
import { useRole } from '@/hooks/useRole';
import { authFetch } from '@/utils/authFetch';
import toast from 'react-hot-toast';

export default function FavoriteButton({ classData }) {
  const { user } = useRole();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (!user) return;
    const checkFavorite = async () => {
      const res = await authFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/favorites/check?classId=${classData._id}&userEmail=${user.email}`
      );
      const data = await res.json();
      setIsFavorited(data.data?.isFavorited);
    };
    checkFavorite();
  }, [user, classData._id]);

  const handleClick = async () => {
    const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        classId: classData._id,
        className: classData.className,
        trainerName: classData.trainerName,
        price: classData.price,
        image: classData.image,
        userEmail: user.email,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setIsFavorited(true);
      toast.success('Successfully added to your favorites!');
    } else {
      toast.error(data.message || 'Failed to add to favorites');
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isFavorited}
      className={`rounded-lg border px-6 py-3 font-semibold ${
        isFavorited ? 'cursor-not-allowed text-gray-400' : 'text-orange-500'
      }`}
    >
      {isFavorited ? 'Saved to Favorites' : 'Add to Favorites'}
    </button>
  );
}