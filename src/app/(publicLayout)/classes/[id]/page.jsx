'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useRole } from '@/hooks/useRole';
import { authFetch } from '@/utils/authFetch';
import BookNowButton from '@/components/classes/BookNowButton';
import FavoriteButton from '@/components/classes/FavoriteButton';
import Loading from '@/components/shared/Loading';

export default function ClassDetailsPage() {
  const { id } = useParams();
  const { user, loading: authLoading } = useRole();
  const router = useRouter();
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/login?redirect=/classes/${id}`);
      return;
    }

    if (!user) return;

    const fetchClass = async () => {
      const res = await authFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/classes/${id}`
      );
      const data = await res.json();
      setClassData(data.data);
    };

    fetchClass();
  }, [id, user, authLoading]);

  if (authLoading) return <Loading />;
  if (!user) return null;
  if (!classData) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-12">
      <img
        src={classData.image}
        alt={classData.className}
        className="w-full rounded-xl object-cover max-h-96"
      />
      <h1 className="mt-6 text-3xl font-bold">{classData.className}</h1>
      <p className="mt-2 text-gray-500">Trainer: {classData.trainerName}</p>
      <p className="mt-1 text-gray-500">Category: {classData.category}</p>
      <p className="mt-1 text-gray-500">Duration: {classData.duration}</p>
      <p className="mt-1 text-gray-500">Schedule: {classData.schedule}</p>
      <p className="mt-1 text-xl font-bold text-orange-500">${classData.price}</p>
      <p className="mt-4">{classData.description}</p>

      <div className="mt-6 flex gap-4">
        <BookNowButton classData={classData} />
        <FavoriteButton classData={classData} />
      </div>
    </div>
  );
}