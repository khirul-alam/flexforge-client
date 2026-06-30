'use client';

import { useEffect, useState } from 'react';
import ApplicantDetailsModal from '@/components/dashboard/ApplicantDetailsModal';

export default function AppliedTrainersPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

  const fetchApplications = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trainer-applications`, {
      credentials: 'include',
    });
    const data = await res.json();
    setApplications(data.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return null;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Applied Trainers</h1>
      <table className="w-full overflow-hidden rounded-lg bg-white shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Applicant Name</th>
            <th className="p-3">Specialty</th>
            <th className="p-3">Applied On</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id} className="border-t">
              <td className="p-3">{app.userName}</td>
              <td className="p-3">{app.specialty}</td>
              <td className="p-3">{new Date(app.createdAt).toLocaleDateString()}</td>
              <td className="p-3">
                <button
                  onClick={() => setSelectedApp(app)}
                  className="rounded-lg bg-orange-500 px-3 py-1 text-xs text-white"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
          {applications.length === 0 && (
            <tr>
              <td colSpan={4} className="p-6 text-center text-gray-400">
                No pending applications.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedApp && (
        <ApplicantDetailsModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
          onActionComplete={fetchApplications}
        />
      )}
    </div>
  );
}