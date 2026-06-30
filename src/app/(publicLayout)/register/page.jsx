'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { signUp } from '@/lib/auth-client';
import { uploadImageToImgbb } from '@/utils/imageUpload';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (pwd) => {
    const rule = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return rule.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      toast.error('Password must be 6+ characters with 1 uppercase & 1 lowercase letter');
      return;
    }

    let imageUrl = '';
    if (imageFile) {
      imageUrl = await uploadImageToImgbb(imageFile);
    }

    const { error } = await signUp.email({ name, email, password, image: imageUrl });

    if (error) {
      toast.error(error.message || 'Registration failed');
      return;
    }

    toast.success('Account created successfully!');
    router.push('/');
  };

  return (
    <div className="container mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4">
      <h1 className="mb-6 text-3xl font-bold">Create Your Account</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg border p-3"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg border p-3"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="rounded-lg border p-3"
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

        <p className="text-xs text-gray-500">
          Min 6 characters, at least 1 uppercase &amp; 1 lowercase letter.
        </p>
        <button type="submit" className="rounded-lg bg-orange-500 py-3 font-semibold text-white">
          Register
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link href="/login" className="text-orange-500">
          Login
        </Link>
      </p>
    </div>
  );
}