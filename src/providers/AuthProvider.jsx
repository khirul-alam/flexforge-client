'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from '@/lib/auth-client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: session, isPending } = useSession();
  const [appUser, setAppUser] = useState(null);

  useEffect(() => {
    const syncUser = async () => {
      if (!session?.user) {
        setAppUser(null);
        return;
      }

      try {
        // 1. Ensure user document exists on Express server
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
          }),
        });

        // 2. Issue JWT cookie
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/jwt`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: session.user.email }),
        });

        // 3. Small delay to ensure cookie is set before next request
        await new Promise((resolve) => setTimeout(resolve, 300));

        // 4. Fetch full user doc with role
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${session.user.email}`,
          { credentials: 'include' }
        );
        const data = await res.json();

        if (data.success) {
          setAppUser(data.data);
        }
      } catch (error) {
        console.error('Auth sync error:', error);
      }
    };

    syncUser();
  }, [session]);

  return (
    <AuthContext.Provider value={{ user: appUser, loading: isPending }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}