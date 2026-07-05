'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRole } from '@/hooks/useRole';
import { signOut } from '@/lib/auth-client';
import { clearToken } from '@/utils/tokenStore';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user } = useRole();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      clearToken();
      await signOut();

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      toast.success('Logged out successfully');
      window.location.href = '/';
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <nav className="bg-gradient-to-r from-orange-600 to-orange-700 shadow-lg shadow-orange-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white">FlexForge</Link>

          {/* Menu Links with Active State */}
          <div className="hidden md:flex items-center gap-8 text-white font-medium">
            <Link 
              href="/" 
              className={`hover:text-orange-200 transition-colors ${pathname === '/' ? 'text-orange-200 font-semibold border-b-2 border-white pb-1' : ''}`}
            >
              Home
            </Link>
            <Link 
              href="/all-classes" 
              className={`hover:text-orange-200 transition-colors ${pathname === '/all-classes' ? 'text-orange-200 font-semibold border-b-2 border-white pb-1' : ''}`}
            >
              All Classes
            </Link>
            <Link 
              href="/community-forum" 
              className={`hover:text-orange-200 transition-colors ${pathname === '/community-forum' ? 'text-orange-200 font-semibold border-b-2 border-white pb-1' : ''}`}
            >
              Community Forum
            </Link>
            {user && (
              <Link 
                href="/dashboard" 
                className={`hover:text-orange-200 transition-colors ${pathname.startsWith('/dashboard') ? 'text-orange-200 font-semibold border-b-2 border-white pb-1' : ''}`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={user.image} 
                    alt={user.name} 
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-white/50 cursor-pointer" 
                  />
                  <span className="hidden md:block text-white font-medium">
                    {user.name || user.email?.split('@')[0]}
                  </span>
                </div>

                <button 
                  onClick={handleLogout} 
                  className="cursor-pointer rounded-xl border border-white/30 bg-white/10 px-5 py-2 text-white font-medium hover:bg-white/20 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="cursor-pointer text-white font-medium px-5 py-2 rounded-xl hover:bg-white/10 transition-all"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="cursor-pointer bg-white text-orange-600 font-semibold px-5 py-2 rounded-xl hover:bg-orange-50 transition-all"
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