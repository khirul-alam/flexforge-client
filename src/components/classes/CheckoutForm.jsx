// 'use client';

// import { useState } from 'react';
// import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
// import { authFetch } from '@/utils/authFetch';
// import toast from 'react-hot-toast';

// export default function CheckoutForm({ classData, user, router }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [processing, setProcessing] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setProcessing(true);

//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       redirect: 'if_required',
//     });

//     if (error) {
//       toast.error(error.message || 'Payment failed');
//       setProcessing(false);
//       return;
//     }

//     if (paymentIntent?.status === 'succeeded') {
//       const bookingRes = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           classId: classData._id,
//           className: classData.className,
//           trainerName: classData.trainerName,
//           trainerEmail: classData.trainerEmail,
//           userEmail: user.email,
//           userName: user.name,
//           schedule: classData.schedule,
//           price: classData.price,
//           transactionId: paymentIntent.id,
//         }),
//       });
//       const bookingData = await bookingRes.json();

//       if (!bookingData.success) {
//         toast.error(bookingData.message || 'Booking failed');
//         setProcessing(false);
//         return;
//       }

//       await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userEmail: user.email,
//           amount: classData.price,
//           classId: classData._id,
//           className: classData.className,
//           transactionId: paymentIntent.id,
//           date: new Date(),
//         }),
//       });

//       toast.success('Payment successful! Class booked.');
//       router.push('/dashboard/booked-classes');
//     }

//     setProcessing(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="rounded-xl border p-6 shadow-sm">
//       <PaymentElement />
//       <button
//         type="submit"
//         disabled={!stripe || processing}
//         className="mt-6 w-full rounded-lg bg-orange-500 py-3 font-semibold text-white disabled:opacity-50"
//       >
//         {processing ? 'Processing...' : `Pay $${classData.price}`}
//       </button>
//     </form>
//   );
// }
'use client';

import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';

export default function CheckoutForm({ classData, user, router }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Payment system is not ready. Please refresh the page.");
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success?classId=${classData._id}`,
        },
      });

      if (error) {
        toast.error(error.message || "Payment failed. Please try again.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full rounded-xl bg-orange-600 py-4 text-lg font-semibold text-white hover:bg-orange-700 disabled:opacity-50 transition-all"
      >
        {isProcessing ? "Processing Payment..." : `Pay $${classData.price}`}
      </button>

      <p className="text-center text-sm text-gray-500">
        Secure payment powered by Stripe
      </p>
    </form>
  );
}