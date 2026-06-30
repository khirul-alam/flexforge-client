'use client';

import { useEffect, useState } from 'react';

export default function ViewStudentsModal({ classId, onClose }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/class/${classId}`, {
        credentials: 'include',
      });
      const data = await res.json();
      setStudents(data.data || []);
    };
    fetchStudents();
  }, [classId]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">Enrolled Students</h2>

        <ul className="flex flex-col gap-2">
          {students.map((s) => (
            <li key={s._id} className="rounded-lg border p-3">
              <p className="font-medium">{s.userName}</p>
              <p className="text-sm text-gray-500">{s.userEmail}</p>
            </li>
          ))}
        </ul>

        <button onClick={onClose} className="mt-4 rounded-lg border px-4 py-2">
          Close
        </button>
      </div>
    </div>
  );
}