'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { authFetch } from '@/utils/authFetch';
import BookNowButton from '@/components/classes/BookNowButton';
import FavoriteButton from '@/components/classes/FavoriteButton';

export default function ClassDetailsPage() {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    const fetchClass = async () => {
      const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/classes/${id}`);
      const data = await res.json();
      setClassData(data.data);
    };
    fetchClass();
  }, [id]);

  if (!classData) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <img src={classData.image} alt={classData.className} className="w-full rounded-xl object-cover" />
      <h1 className="mt-6 text-3xl font-bold">{classData.className}</h1>
      <p className="mt-2 text-gray-500">Trainer: {classData.trainerName}</p>
      <p className="mt-4">{classData.description}</p>
      <div className="mt-6 flex gap-4">
        <BookNowButton classData={classData} />
        <FavoriteButton classData={classData} />
      </div>
    </div>
  );
}