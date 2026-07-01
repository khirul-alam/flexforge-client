'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRole } from '@/hooks/useRole';
import { authFetch } from '@/utils/authFetch';
import { uploadImageToImgbb } from '@/utils/imageUpload';
import toast from 'react-hot-toast';

export default function AddForumPostPage() {
  const { user } = useRole();
  const router = useRouter();
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const form = e.target;
      if (!imageFile) { toast.error('Please select an image'); setSubmitting(false); return; }

      const imageUrl = await uploadImageToImgbb(imageFile);

      const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title.value,
          image: imageUrl,
          description: form.description.value,
          authorEmail: user.email,
          authorName: user.name,
          authorRole: user.role,
        }),
      });

      const data = await res.json();
      if (!data.success) { toast.error(data.message || 'Failed to publish post'); return; }

      toast.success('Forum post published!');
      form.reset();
      setImageFile(null);
      router.push(user.role === 'admin' ? '/dashboard/forum-manage' : '/dashboard/my-forum-posts');
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Add Forum Post</h1>
      <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-4 rounded-lg bg-white p-6 shadow">
        <input name="title" type="text" placeholder="Title" className="rounded-lg border p-3" required />
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="rounded-lg border p-3" required />
        <textarea name="description" placeholder="Description" className="rounded-lg border p-3" rows={5} required />
        <button type="submit" disabled={submitting} className="rounded-lg bg-orange-500 py-3 font-semibold text-white disabled:opacity-50">
          {submitting ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
}