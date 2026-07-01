'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripe';
import { useRole } from '@/hooks/useRole';
import { authFetch } from '@/utils/authFetch';
import CheckoutForm from '@/components/classes/CheckoutForm';

export default function PaymentPage() {
  const { classId } = useParams();
  const { user } = useRole();
  const router = useRouter();
  const [classData, setClassData] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const fetchClass = async () => {
      const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/classes/${classId}`);
      const data = await res.json();
      setClassData(data.data);

      const piRes = await authFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-payment-intent`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ price: data.data.price }),
        }
      );
      const piData = await piRes.json();
      setClientSecret(piData.clientSecret);
    };
    fetchClass();
  }, [classId]);

  if (!classData || !clientSecret) return null;

  return (
    <div className="container mx-auto max-w-lg px-4 py-12">
      <h1 className="mb-6 text-2xl font-bold">Complete Your Payment</h1>
      <div className="mb-6 rounded-xl border p-6 shadow-sm">
        <p className="font-semibold">{classData.className}</p>
        <p className="text-gray-500">Trainer: {classData.trainerName}</p>
        <p className="mt-2 text-xl font-bold">${classData.price}</p>
      </div>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm classData={classData} user={user} router={router} />
      </Elements>
    </div>
  );
}