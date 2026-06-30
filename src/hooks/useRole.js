import { useAuth } from './useAuth';

export function useRole() {
  const { user, loading } = useAuth();
  return { user, role: user?.role || null, loading };
}