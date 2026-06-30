'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ApplicantDetailsModal({ application, onClose, onActionComplete }) {
  const [feedback, setFeedback] = useState('');

  const handleApprove = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/trainer-applications/approve/${application._id}`,
      { method: 'PATCH', credentials: 'include' }
    );
    const data = await res.json();

    if (data.success) {
      toast.success('Trainer application approved');
      onActionComplete();
      onClose();
    } else {
      toast.error(data.message || 'Action failed');
    }
  };

  const handleReject = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/trainer-applications/reject/${application._id}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback }),
      }
    );
    const data = await res.json();

    if (data.success) {
      toast.success('Trainer application rejected');
      onActionComplete();
      onClose();
    } else {
      toast.error(data.message || 'Action failed');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">Trainer Application</h2>
        <p><strong>Name:</strong> {application.userName}</p>
        <p><strong>Experience:</strong> {application.experience} years</p>
        <p><strong>Specialty:</strong> {application.specialty}</p>
        <p><strong>Applied:</strong> {new Date(application.createdAt).toLocaleDateString()}</p>

        <textarea
          placeholder="Feedback (required for rejection)"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="mt-4 w-full rounded-lg border p-3"
          rows={3}
        />

        <div className="mt-4 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border px-4 py-2">
            Close
          </button>
          <button onClick={handleReject} className="rounded-lg bg-red-500 px-4 py-2 text-white">
            Reject
          </button>
          <button onClick={handleApprove} className="rounded-lg bg-green-500 px-4 py-2 text-white">
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}