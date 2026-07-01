'use client';

import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useSession } from '@/lib/auth-client';

const AuthContext = createContext(null);

// In-memory token storage (not localStorage - more secure)
let memoryToken = null;

export function getMemoryToken() {
  return memoryToken;
}

export function AuthProvider({ children }) {
  const { data: session, isPending } = useSession();
  const [appUser, setAppUser] = useState(null);

  useEffect(() => {
    const syncUser = async () => {
      if (!session?.user) {
        setAppUser(null);
        memoryToken = null;
        return;
      }

      try {
        // 1. Ensure user document exists
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
          }),
        });

        // 2. Issue JWT — get token from response body
        const jwtRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/jwt`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: session.user.email }),
        });
        const jwtData = await jwtRes.json();

        if (jwtData.token) {
          memoryToken = jwtData.token;
        }

        // 3. Fetch full user doc with role
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${session.user.email}`,
          {
            credentials: 'include',
            headers: {
              'Authorization': `Bearer ${memoryToken}`,
            },
          }
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