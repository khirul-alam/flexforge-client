'use client';

import { motion } from 'framer-motion';

const features = [
  {
    title: 'Expert Trainers',
    desc: 'Learn from certified fitness professionals.',
    icon: '🏋️',
  },
  {
    title: 'Flexible Scheduling',
    desc: 'Book classes that fit your routine.',
    icon: '📅',
  },
  {
    title: 'Community Support',
    desc: 'Connect, share, and grow with others.',
    icon: '🤝',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

export default function WhyChooseUs() {
  return (
    <section className="container mx-auto px-6 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center text-3xl font-bold"
      >
        Why Choose FlexForge
      </motion.h2>

      <div className="grid gap-6 sm:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="rounded-xl border p-6 text-center shadow-sm cursor-default"
          >
            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
            <p className="text-gray-500">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}