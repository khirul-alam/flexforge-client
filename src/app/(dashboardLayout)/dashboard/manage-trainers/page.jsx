'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ManageTrainersPage() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrainers = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      credentials: 'include',
    });
    const data = await res.json();
    const trainerOnly = (data.data || []).filter((u) => u.role === 'trainer');
    setTrainers(trainerOnly);
    setLoading(false);
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleDemote = async (id) => {
    if (!confirm('Demote this trainer back to User? They will lose trainer privileges.')) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/demote/${id}`, {
      method: 'PATCH',
      credentials: 'include',
    });
    const data = await res.json();

    if (data.success) {
      toast.success('Trainer demoted to User');
      fetchTrainers();
    } else {
      toast.error(data.message || 'Action failed');
    }
  };

  if (loading) return null;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Manage Trainers</h1>
      <table className="w-full overflow-hidden rounded-lg bg-white shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((t) => (
            <tr key={t._id} className="border-t">
              <td className="p-3">{t.name}</td>
              <td className="p-3">{t.email}</td>
              <td className="p-3">
                <button
                  onClick={() => handleDemote(t._id)}
                  className="rounded-lg bg-red-500 px-3 py-1 text-xs text-white"
                >
                  Demote to User
                </button>
              </td>
            </tr>
          ))}
          {trainers.length === 0 && (
            <tr>
              <td colSpan={3} className="p-6 text-center text-gray-400">
                No trainers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}