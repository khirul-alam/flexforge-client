'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRole } from '@/hooks/useRole';
import { signOut } from '@/lib/auth-client';
import { clearToken } from '@/utils/tokenStore';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user } = useRole();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      clearToken();
      await signOut();

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      toast.success('Logged out successfully');
      router.push('/');
      router.refresh();
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-sm">
      <Link href="/" className="text-xl font-bold text-orange-500">
        FlexForge
      </Link>

      <div className="hidden gap-6 md:flex">
        <Link href="/">Home</Link>
        <Link href="/all-classes">All Classes</Link>
        <Link href="/community-forum">Community Forum</Link>
        {user && <Link href="/dashboard">Dashboard</Link>}
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <img src={user.image} alt={user.name} className="h-9 w-9 rounded-full object-cover" />
            <button onClick={handleLogout} className="rounded-lg border px-4 py-2">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="rounded-lg border px-4 py-2 font-medium hover:bg-gray-50">
              Login
            </Link>
            <Link href="/register" className="rounded-lg bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}