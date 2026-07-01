'use client';

import { useEffect, useState } from 'react';
import { useRole } from '@/hooks/useRole';
import { authFetch } from '@/utils/authFetch';
import ViewStudentsModal from '@/components/dashboard/ViewStudentsModal';
import toast from 'react-hot-toast';

export default function MyClassesPage() {
  const { user, loading: authLoading } = useRole();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingClassId, setViewingClassId] = useState(null);
  const [editingClass, setEditingClass] = useState(null);

  const fetchClasses = async () => {
    if (!user?.email) { setLoading(false); return; }
    try {
      const res = await authFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/classes/trainer/${user.email}`
      );
      const data = await res.json();
      setClasses(Array.isArray(data.data) ? data.data.filter(Boolean) : []);
    } catch (err) {
      setClasses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    fetchClasses();
  }, [user, authLoading]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this class?')) return;
    const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/classes/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.success) { toast.success('Class deleted'); fetchClasses(); }
    else toast.error(data.message || 'Delete failed');
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editingClass?._id) return;
    const form = e.target;
    const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/classes/${editingClass._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        className: form.className.value,
        category: form.category.value,
        difficultyLevel: form.difficultyLevel.value,
        duration: form.duration.value,
        schedule: form.schedule.value,
        price: parseFloat(form.price.value),
        description: form.description.value,
      }),
    });
    const data = await res.json();
    if (data.success) { toast.success('Class updated successfully'); setEditingClass(null); fetchClasses(); }
    else toast.error(data.message || 'Update failed');
  };

  if (authLoading || loading) return null;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">My Classes</h1>
      <table className="w-full overflow-hidden rounded-lg bg-white shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Class Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Status</th>
            <th className="p-3">Booking Count</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.filter((cls) => cls && cls._id).map((cls) => (
            <tr key={cls._id} className="border-t">
              <td className="p-3">{cls.className}</td>
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
              <td className="p-3">{cls.bookingCount || 0}</td>
              <td className="p-3">
                <div className="flex gap-2">
                  <button onClick={() => setEditingClass(cls)} className="rounded-lg bg-blue-500 px-3 py-1 text-xs text-white">Update</button>
                  <button onClick={() => setViewingClassId(cls._id)} className="rounded-lg bg-gray-500 px-3 py-1 text-xs text-white">View Students</button>
                  <button onClick={() => handleDelete(cls._id)} className="rounded-lg bg-red-500 px-3 py-1 text-xs text-white">Delete</button>
                </div>
              </td>
            </tr>
          ))}
          {classes.length === 0 && (
            <tr><td colSpan={5} className="p-6 text-center text-gray-400">No classes yet.</td></tr>
          )}
        </tbody>
      </table>

      {viewingClassId && <ViewStudentsModal classId={viewingClassId} onClose={() => setViewingClassId(null)} />}

      {editingClass && editingClass._id && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-xl bg-white p-6">
            <h2 className="mb-4 text-xl font-bold">Update Class</h2>
            <form onSubmit={handleUpdateSubmit} className="grid gap-4 sm:grid-cols-2">
              <input name="className" defaultValue={editingClass.className} className="rounded-lg border p-3" required />
              <select name="category" defaultValue={editingClass.category} className="rounded-lg border p-3" required>
                <option value="Yoga">Yoga</option>
                <option value="Cardio">Cardio</option>
                <option value="Weights">Weights</option>
                <option value="Pilates">Pilates</option>
                <option value="CrossFit">CrossFit</option>
              </select>
              <select name="difficultyLevel" defaultValue={editingClass.difficultyLevel} className="rounded-lg border p-3" required>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <input name="duration" defaultValue={editingClass.duration} className="rounded-lg border p-3" required />
              <input name="schedule" defaultValue={editingClass.schedule} className="rounded-lg border p-3" required />
              <input name="price" type="number" defaultValue={editingClass.price} className="rounded-lg border p-3" required />
              <textarea name="description" defaultValue={editingClass.description} className="col-span-full rounded-lg border p-3" rows={3} required />
              <div className="col-span-full flex justify-end gap-3">
                <button type="button" onClick={() => setEditingClass(null)} className="rounded-lg border px-4 py-2">Cancel</button>
                <button type="submit" className="rounded-lg bg-orange-500 px-4 py-2 text-white">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}