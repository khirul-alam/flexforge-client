import { getToken } from './tokenStore';

export async function authFetch(url, options = {}) {
  const token = getToken();

  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return fetch(url, {
    ...options,
    credentials: 'include',
    headers,
  });
}