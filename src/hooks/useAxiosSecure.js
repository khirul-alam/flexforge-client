import axios from 'axios';
import { useRouter } from 'next/navigation';

const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
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