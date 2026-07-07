'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah K.',
    text: 'FlexForge transformed how I approach fitness. Love the booking flow!',
    avatar: '👩',
  },
  {
    name: 'Michael R.',
    text: 'Found an amazing yoga trainer through this platform.',
    avatar: '👨',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-50 px-6 py-16">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center text-3xl font-bold"
        >
          What Our Members Say
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <div className="text-4xl mb-3">{t.avatar}</div>
              <p className="italic text-gray-600">&ldquo;{t.text}&rdquo;</p>
              <p className="mt-4 font-semibold">— {t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}