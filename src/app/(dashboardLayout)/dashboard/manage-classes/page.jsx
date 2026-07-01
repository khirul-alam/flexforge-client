'use client';

import { useEffect, useState } from 'react';
import { authFetch } from '@/utils/authFetch';
import toast from 'react-hot-toast';

export default function ManageClassesPage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClasses = async () => {
    const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/classes/all`);
    const data = await res.json();
    setClasses(data.data || []);
    setLoading(false);
  };

  useEffect(() => { fetchClasses(); }, []);

  const updateStatus = async (id, status) => {
    const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/classes/status/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (data.success) { toast.success(`Class ${status}`); fetchClasses(); }
    else toast.error(data.message || 'Action failed');
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this class?')) return;
    const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/classes/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) { toast.success('Class deleted'); fetchClasses(); }
    else toast.error(data.message || 'Delete failed');
  };

  if (loading) return null;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Manage Classes</h1>
      <table className="w-full overflow-hidden rounded-lg bg-white shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Class Name</th>
            <th className="p-3">Trainer</th>
            <th className="p-3">Category</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <tr key={cls._id} className="border-t">
              <td className="p-3">{cls.className}</td>
              <td className="p-3">{cls.trainerName}</td>
              <td className="p-3">{cls.category}</td>
              <td className="p-3">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                  cls.status === 'approved' ? 'bg-green-100 text-green-700'
                  : cls.status === 'rejected' ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {cls.status}
                </span>
              </td>
              <td className="p-3">
                <div className="flex gap-2">
                  {cls.status !== 'approved' && <button onClick={() => updateStatus(cls._id, 'approved')} className="rounded-lg bg-green-500 px-3 py-1 text-xs text-white">Approve</button>}
                  {cls.status !== 'rejected' && <button onClick={() => updateStatus(cls._id, 'rejected')} className="rounded-lg bg-yellow-500 px-3 py-1 text-xs text-white">Reject</button>}
                  <button onClick={() => handleDelete(cls._id)} className="rounded-lg bg-red-500 px-3 py-1 text-xs text-white">Delete</button>
                </div>
              </td>
            </tr>
          ))}
          {classes.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-gray-400">No classes found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}