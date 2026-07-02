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
    <nav className="bg-gradient-to-r from-orange-600 to-orange-700 shadow-lg shadow-orange-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Left Side - Logo (আগের পজিশন) */}
          <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2 hover:scale-105 transition-transform">
            FlexForge
          </Link>

          {/* Center Menu */}
          <div className="hidden md:flex items-center gap-8 text-white font-medium">
            <Link href="/" className="hover:text-orange-200 transition-colors">Home</Link>
            <Link href="/all-classes" className="hover:text-orange-200 transition-colors">All Classes</Link>
            <Link href="/community-forum" className="hover:text-orange-200 transition-colors">Community Forum</Link>
            {user && <Link href="/dashboard" className="hover:text-orange-200 transition-colors">Dashboard</Link>}
          </div>

          {/* Right Side - User + Buttons (আগের পজিশন) */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <img 
                    src={user.image} 
                    alt={user.name} 
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-white/50" 
                  />
                </div>
                <button 
                  onClick={handleLogout} 
                  className="rounded-xl border border-white/30 bg-white/10 px-5 py-2 text-white font-medium hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="rounded-xl border border-white/30 px-5 py-2 text-white font-medium hover:bg-white/10 transition-all"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="rounded-xl bg-white text-orange-600 font-semibold px-5 py-2 hover:bg-orange-50 transition-all hover:scale-105 active:scale-95"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}