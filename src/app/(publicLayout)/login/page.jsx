'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { signIn } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await signIn.email({ email, password });

    if (error) {
      toast.error(error.message || 'Login failed');
      return;
    }

    toast.success('Logged in successfully!');
    router.push('/');
  };

  const handleGoogleLogin = async () => {
    await signIn.social({ provider: 'google', callbackURL: '/' });
  };

  return (
    <div className="container mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4">
      <h1 className="mb-6 text-3xl font-bold">Login to FlexForge</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg border p-3"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border p-3 pr-12"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button type="submit" className="rounded-lg bg-orange-500 py-3 font-semibold text-white cursor-pointer">
          Login
        </button>
      </form>

      <button onClick={handleGoogleLogin} className="mt-4 rounded-lg border py-3 font-semibold cursor-pointer">
        Continue with Google
      </button>

      <p className="mt-4 text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-orange-500">
          Register
        </Link>
      </p>
    </div>
  );
}