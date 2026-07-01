'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRole } from '@/hooks/useRole';
import { authFetch } from '@/utils/authFetch';

export default function BookedClassesPage() {
  const { user } = useRole();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchBookings = async () => {
      const res = await authFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/user/${user.email}`
      );
      const data = await res.json();
      setBookings(data.data || []);
      setLoading(false);
    };
    fetchBookings();
  }, [user]);

  if (loading) return null;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">My Booked Classes</h1>
      <table className="w-full overflow-hidden rounded-lg bg-white shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Class Name</th>
            <th className="p-3">Trainer Name</th>
            <th className="p-3">Schedule</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} className="border-t">
              <td className="p-3">{booking.className}</td>
              <td className="p-3">{booking.trainerName}</td>
              <td className="p-3">
                {typeof booking.schedule === 'string' ? booking.schedule : JSON.stringify(booking.schedule)}
              </td>
              <td className="p-3">
                <Link href={`/classes/${booking.classId}`} className="text-orange-500">
                  View Details
                </Link>
              </td>
            </tr>
          ))}
          {bookings.length === 0 && (
            <tr>
              <td colSpan={4} className="p-6 text-center text-gray-400">No bookings yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}