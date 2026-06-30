'use client';

import { useEffect, useState } from 'react';
import { useRole } from '@/hooks/useRole';
import StatsCard from '@/components/dashboard/StatsCard';

export default function DashboardOverviewPage() {
  const { user, role } = useRole();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      let endpoint = '';
      if (role === 'admin') endpoint = '/api/stats/admin';
      else if (role === 'trainer') endpoint = `/api/stats/trainer/${user.email}`;
      else endpoint = `/api/stats/user/${user.email}`;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        credentials: 'include',
      });
      const data = await res.json();
      setStats(data.data);
    };

    fetchStats();
  }, [user, role]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {role === 'user' && (
          <>
            <StatsCard title="Total Booked Classes" value={stats?.totalBooked ?? 0} />
            <StatsCard title="Total Favorites" value={stats?.totalFavorites ?? 0} />
          </>
        )}
        {role === 'trainer' && (
          <>
            <StatsCard title="Total Classes Created" value={stats?.totalClasses ?? 0} />
            <StatsCard title="Total Students Enrolled" value={stats?.totalStudents ?? 0} />
          </>
        )}
        {role === 'admin' && (
          <>
            <StatsCard title="Total Users" value={stats?.totalUsers ?? 0} />
            <StatsCard title="Total Classes" value={stats?.totalClasses ?? 0} />
            <StatsCard title="Total Booked Classes" value={stats?.totalBookedClasses ?? 0} />
          </>
        )}
      </div>

      {/* Profile + Role Badge + Trainer Application Status (only for 'user' role) */}
      <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <img src={user?.image} alt={user?.name} className="h-16 w-16 rounded-full object-cover" />
          <div>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <span className="mt-1 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-600">
              {role}
            </span>
          </div>
        </div>

        {role === 'user' && user?.trainerApplicationStatus !== 'none' && (
          <div className="mt-4 rounded-lg bg-gray-50 p-4">
            <p className="text-sm font-medium">
              Trainer Application Status:{' '}
              <span
                className={`font-semibold ${
                  user?.trainerApplicationStatus === 'approved'
                    ? 'text-green-600'
                    : user?.trainerApplicationStatus === 'rejected'
                    ? 'text-red-600'
                    : 'text-yellow-600'
                }`}
              >
                {user?.trainerApplicationStatus}
              </span>
            </p>
            {user?.trainerApplicationStatus === 'rejected' && user?.adminFeedback && (
              <p className="mt-2 text-sm text-gray-600">
                <strong>Admin Feedback:</strong> {user.adminFeedback}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}