import axios from 'axios';
import { useRouter } from 'next/navigation';
import { getMemoryToken } from '@/providers/AuthProvider';

const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

axiosSecure.interceptors.request.use((config) => {
  const token = getMemoryToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function useAxiosSecure() {
  const router = useRouter();

  axiosSecure.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        router.push('/login');
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
}