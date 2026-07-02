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
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 shadow-xl shadow-orange-950/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-white rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-110">
              <span className="text-orange-600 font-bold text-3xl">F</span>
            </div>
            <span className="text-3xl font-bold text-white tracking-tighter">FlexForge</span>
          </Link>

          {/* Menu Links */}
          <div className="hidden md:flex items-center gap-8 text-white">
            <Link href="/" className="hover:text-orange-200 transition-colors duration-200 font-medium">Home</Link>
            <Link href="/all-classes" className="hover:text-orange-200 transition-colors duration-200 font-medium">All Classes</Link>
            <Link href="/community-forum" className="hover:text-orange-200 transition-colors duration-200 font-medium">Community Forum</Link>
            {user && (
              <Link href="/dashboard" className="hover:text-orange-200 transition-colors duration-200 font-medium">Dashboard</Link>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <img 
                    src={user.image} 
                    alt={user.name} 
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-white/30" 
                  />
                  <span className="hidden md:block text-white font-medium">{user.name}</span>
                </div>
                
                <button 
                  onClick={handleLogout} 
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-2xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="px-6 py-2.5 text-white font-medium hover:bg-white/10 rounded-2xl transition-all duration-300 border border-white/20"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="bg-white text-orange-700 hover:bg-orange-50 px-6 py-2.5 font-semibold rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
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