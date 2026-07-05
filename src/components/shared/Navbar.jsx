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
    <nav className="bg-linear-to-r from-orange-600 to-orange-700 shadow-lg shadow-orange-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white">FlexForge</Link>

          {/* Menu */}
          <div className="hidden md:flex items-center gap-8 text-white font-medium">
            <Link href="/" className="hover:text-orange-200 transition-colors">Home</Link>
            <Link href="/all-classes" className="hover:text-orange-200 transition-colors">All Classes</Link>
            <Link href="/community-forum" className="hover:text-orange-200 transition-colors">Community Forum</Link>
            {user && <Link href="/dashboard" className="hover:text-orange-200 transition-colors">Dashboard</Link>}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                {/* User Avatar + Name */}
                <div className="flex items-center gap-3">
                  <img 
                    src={user.image} 
                    alt={user.name} 
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-white/50 cursor-pointer" 
                  />
                  <span className="hidden md:block text-white font-medium cursor-pointer">
                    {user.name || user.email?.split('@')[0]}
                  </span>
                </div>

                <button 
                  onClick={handleLogout} 
                  className="rounded-xl border border-white/30 bg-white/10 px-5 py-2 text-white font-medium hover:bg-white/20 transition-all cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-white font-medium px-5 py-2 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="bg-white text-orange-600 font-semibold px-5 py-2 rounded-xl hover:bg-orange-50 transition-all cursor-pointer"
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