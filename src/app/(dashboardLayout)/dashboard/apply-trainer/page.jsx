'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRole } from '@/hooks/useRole';
import { authFetch } from '@/utils/authFetch';
import toast from 'react-hot-toast';

export default function ApplyTrainerPage() {
  const { user } = useRole();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const form = e.target;
      const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trainer-applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: user.email,
          userName: user.name,
          experience: parseInt(form.experience.value),
          specialty: form.specialty.value,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.message || 'Failed to submit application');
        return;
      }

      toast.success('Trainer application submitted successfully!');
      router.push('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Apply as Trainer</h1>
      <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4 rounded-lg bg-white p-6 shadow">
        <label className="text-sm font-medium">Experience (years)</label>
        <input name="experience" type="number" min="0" className="rounded-lg border p-3" required />
        <label className="text-sm font-medium">Specialty</label>
        <select name="specialty" className="rounded-lg border p-3" required>
          <option value="">Select specialty</option>
          <option value="Yoga">Yoga</option>
          <option value="Weights">Weights</option>
          <option value="Cardio">Cardio</option>
          <option value="Pilates">Pilates</option>
          <option value="CrossFit">CrossFit</option>
        </select>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-orange-500 py-3 font-semibold text-white disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}