'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRole } from '@/hooks/useRole';
import Sidebar from '@/components/dashboard/Sidebar';
import Navbar from '@/components/shared/Navbar';
import Loading from '@/components/shared/Loading';

export default function DashboardLayout({ children }) {
  const { user, loading } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <Loading />;
  if (!user) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  );
}