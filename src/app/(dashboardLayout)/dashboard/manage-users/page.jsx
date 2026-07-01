'use client';

import { useEffect, useState } from 'react';
import { authFetch } from '@/utils/authFetch';
import toast from 'react-hot-toast';

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
    const data = await res.json();
    setUsers(data.data || []);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleBlock = async (id) => {
    const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/block/${id}`, { method: 'PATCH' });
    const data = await res.json();
    if (data.success) { toast.success('User blocked'); fetchUsers(); }
    else toast.error(data.message || 'Action failed');
  };

  const handleUnblock = async (id) => {
    const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/unblock/${id}`, { method: 'PATCH' });
    const data = await res.json();
    if (data.success) { toast.success('User unblocked'); fetchUsers(); }
    else toast.error(data.message || 'Action failed');
  };

  const handleMakeAdmin = async (id) => {
    if (!confirm('Promote this user to Admin?')) return;
    const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/make-admin/${id}`, { method: 'PATCH' });
    const data = await res.json();
    if (data.success) { toast.success('User promoted to Admin'); fetchUsers(); }
    else toast.error(data.message || 'Action failed');
  };

  if (loading) return null;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Manage Users</h1>
      <table className="w-full overflow-hidden rounded-lg bg-white shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3"><span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">{u.role}</span></td>
              <td className="p-3">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${u.status === 'blocked' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {u.status}
                </span>
              </td>
              <td className="p-3">
                <div className="flex gap-2">
                  {u.status === 'blocked'
                    ? <button onClick={() => handleUnblock(u._id)} className="rounded-lg bg-green-500 px-3 py-1 text-xs text-white">Unblock</button>
                    : <button onClick={() => handleBlock(u._id)} className="rounded-lg bg-yellow-500 px-3 py-1 text-xs text-white">Block</button>
                  }
                  {u.role !== 'admin' && (
                    <button onClick={() => handleMakeAdmin(u._id)} className="rounded-lg bg-orange-500 px-3 py-1 text-xs text-white">Make Admin</button>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {users.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-gray-400">No users found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}