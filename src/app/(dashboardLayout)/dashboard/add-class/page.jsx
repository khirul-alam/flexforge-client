'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRole } from '@/hooks/useRole';
import { authFetch } from '@/utils/authFetch';
import { uploadImageToImgbb } from '@/utils/imageUpload';
import toast from 'react-hot-toast';

export default function AddClassPage() {
  const { user } = useRole();
  const router = useRouter();
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const form = e.target;
      if (!imageFile) {
        toast.error('Please select a class image');
        setSubmitting(false);
        return;
      }

      const imageUrl = await uploadImageToImgbb(imageFile);

      const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/classes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          className: form.className.value,
          image: imageUrl,
          category: form.category.value,
          difficultyLevel: form.difficultyLevel.value,
          duration: form.duration.value,
          schedule: form.schedule.value,
          price: parseFloat(form.price.value),
          description: form.description.value,
          trainerEmail: user.email,
          trainerName: user.name,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.message || 'Failed to submit class');
        return;
      }

      toast.success('Class submitted for approval!');
      form.reset();
      setImageFile(null);
      router.push('/dashboard/my-classes');
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Add New Class</h1>
      <form onSubmit={handleSubmit} className="grid max-w-2xl gap-4 rounded-lg bg-white p-6 shadow sm:grid-cols-2">
        <input name="className" type="text" placeholder="Class Name" className="rounded-lg border p-3" required />
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="rounded-lg border p-3" required />
        <select name="category" className="rounded-lg border p-3" required>
          <option value="">Select Category</option>
          <option value="Yoga">Yoga</option>
          <option value="Cardio">Cardio</option>
          <option value="Weights">Weights</option>
          <option value="Pilates">Pilates</option>
          <option value="CrossFit">CrossFit</option>
        </select>
        <select name="difficultyLevel" className="rounded-lg border p-3" required>
          <option value="">Difficulty Level</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <input name="duration" type="text" placeholder="Duration (e.g. 60 mins)" className="rounded-lg border p-3" required />
        <input name="schedule" type="text" placeholder="Schedule (e.g. Mon/Wed/Fri 7AM)" className="rounded-lg border p-3" required />
        <input name="price" type="number" placeholder="Price" className="rounded-lg border p-3" required />
        <textarea name="description" placeholder="Description" className="col-span-full rounded-lg border p-3" rows={4} required />
        <button type="submit" disabled={submitting} className="col-span-full rounded-lg bg-orange-500 py-3 font-semibold text-white disabled:opacity-50">
          {submitting ? 'Submitting...' : 'Submit Class'}
        </button>
      </form>
    </div>
  );
}