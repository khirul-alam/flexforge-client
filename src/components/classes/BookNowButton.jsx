'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRole } from '@/hooks/useRole';
import toast from 'react-hot-toast';

export default function BookNowButton({ classData }) {
  const { user } = useRole();
  const router = useRouter();
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  useEffect(() => {
    if (!user) return;
    const checkBooking = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/check?classId=${classData._id}&userEmail=${user.email}`,
        { credentials: 'include' }
      );
      const data = await res.json();
      setAlreadyBooked(data.data?.alreadyBooked);
    };
    checkBooking();
  }, [user, classData._id]);

  const handleClick = async () => {
    if (alreadyBooked) {
      toast.error('You have already booked this class');
      return;
    }

    if (user?.status === 'blocked') {
      toast.error('Action restricted by Admin');
      return;
    }

    router.push(`/payment/${classData._id}`);
  };

  return (
    <button
      onClick={handleClick}
      disabled={alreadyBooked}
      className={`rounded-lg px-6 py-3 font-semibold text-white ${
        alreadyBooked ? 'cursor-not-allowed bg-gray-400' : 'bg-orange-500'
      }`}
    >
      {alreadyBooked ? 'Already Booked' : 'Book Now'}
    </button>
  );
}